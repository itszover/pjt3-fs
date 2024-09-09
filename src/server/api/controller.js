import card from "./card.js";
import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cache from "../config/cache.js";
import { body, validationResult } from "express-validator";
import logger from '../config/logger.js';

let blacklistedTokens = new Set();

function index(req, res) {
    res.sendFile("dist/index.html", { root: "." });
}

async function login(req, res) {
    await body('username').notEmpty().withMessage('Username is required').run(req);
    await body('password').notEmpty().withMessage('Password is required').run(req);

    const { username, password } = req.body;

    if (!username || !password) {
        logger.warn(`Login attempt with missing credentials: ${JSON.stringify(req.body)}`);
        res.status(400).send({ message: "Dados inválidos" });
        return;
    }

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            logger.warn(`Login attempt with non-existent username: ${username}`);
            res.status(401).send({ message: "Usuário não encontrado" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn(`Invalid password attempt for username: ${username}`);
            res.status(401).send({ message: "Senha inválida" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        logger.info(`Generated token: ${token}`); // Log the generated token
        res.status(200).send({ token });
    } catch (error) {
        logger.error(`Error during login attempt: ${error.message}`);
        res.status(500).send({ message: "Erro ao fazer login" });
    }
}

async function insert(req, res) {
    await body('name').trim().notEmpty().escape().run(req);
    await body('description').trim().notEmpty().escape().run(req);
    await body('image').trim().notEmpty().isURL().run(req);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
        return;
    }
    
    let { name, description, image } = req.body;

    if (!name || !description || !image) {
        res.status(400).send({ message: "Dados inválidos" });
        return;
    }

    new card(req.body).save();
    
    res.status(201);
}

async function select(req, res) {
    let cacheKey = `cards-${req.query.name || ""}`;
    let cachedCards = cache.get(cacheKey);

    if (cachedCards) {
        logger.info(`Cache hit for search query: ${req.query.name}`);
        res.status(200).send(cachedCards);
        return;
    }

    try {
        let cards = await card.find({ name: { $regex: req.query.name || "", $options: "i" } });
        logger.info(`Cards fetched successfully for query: ${req.query.name}`);
        
        cache.set(cacheKey, cards);

        res.status(200).send(cards);
    } catch (error) {
        logger.error(`Error during card search: ${error.message}`);
        res.status(500).send({ message: "Erro ao buscar cartas" });
    }
}

function checkToken(req, res) {
    const header = req.headers['authorization'];
    
    if (!header) {
        return res.status(401).send({ message: "Token não fornecido" });
    }

    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).send({ message: "Token válido" });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({ message: "Token expirado", code: "TOKEN_EXPIRED" });
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).send({ message: "Token inválido", code: "TOKEN_INVALID" });
        } else {
            res.status(500).send({ message: "Erro no servidor" });
        }
    }
}

function logout(req, res) {
    const header = req.headers['authorization'];
    
    if (!header) {
        return res.status(401).send({ message: "Token não fornecido" });
    }

    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Token não fornecido" });
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY);
        blacklistedTokens.add(token);
        logger.info(`Token blacklisted: ${token}`);
        res.status(200).send({ message: "Logout bem-sucedido" });
    } catch (error) {
        logger.error(`Token verification error during logout: ${error.message}`);
        res.status(500).send({ message: "Erro no servidor" });
    }
}

function isTokenBlacklisted(token) {
    return blacklistedTokens.has(token);
}

export default { index, login, insert, select, checkToken, logout, isTokenBlacklisted };