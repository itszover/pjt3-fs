import card from "./card.js";
import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cache from "../config/cache.js";
import { body, validationResult } from "express-validator";

function index(req, res) {
    res.sendFile("dist/index.html", { root: "." });
}

async function login(req, res) {
    await body('username').notEmpty().withMessage('Username is required').run(req);
    await body('password').notEmpty().withMessage('Password is required').run(req);

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({ message: "Dados inválidos" });
        return;
    }

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            res.status(401).send({ message: "Usuário não encontrado" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({ message: "Senha inválida" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ token });        
    } catch (error) {
        console.log(error)
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
        res.status(200).send(cachedCards);
        return;
    }

    try {
        let cards = await card.find({ name: { $regex: req.query.name || "", $options: "i" } });
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar cartas" });
    }
}

export default { index, login, insert, select };