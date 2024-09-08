import controller from '../api/controller.js';
import logger from '../config/logger.js';
import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    const header = req.headers['authorization'];
    
    if (!header) {
        logger.warn('Access attempt without token');
        res.status(401).send({ message: "Token não fornecido" });
        return;
    }

    const token = header.split(' ')[1];

    if (!token) {
        logger.warn('Access attempt with malformed token');
        res.status(401).send({ message: "Token não fornecido" });
        return;
    }

    if (controller.isTokenBlacklisted(token)) {
        logger.warn('Access attempt with blacklisted token');
        res.status(401).send({ message: "Token inválido", code: "TOKEN_INVALID" });
        return;
    }

    try {
        logger.info(`Received token: ${token}`);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        logger.info(`Decoded token: ${JSON.stringify(decoded)}`);
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            logger.warn(`Expired token attempt: ${error.message}`);
            res.status(401).send({ message: "Token expirado", code: "TOKEN_EXPIRED" });
        } else if (error.name === 'JsonWebTokenError') {
            logger.warn(`Invalid token attempt: ${error.message}`);
            res.status(401).send({ message: "Token inválido", code: "TOKEN_INVALID" });
        } else {
            logger.error(`Token verification error: ${error.message}`);
            res.status(500).send({ message: "Erro no servidor" });
        }
    }
}

export default auth;