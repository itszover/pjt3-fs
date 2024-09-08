import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

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

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        logger.error(`Invalid token attempt: ${error.message}`);
        res.status(401).send({ message: "Token inválido" });
    }
}

export default auth;