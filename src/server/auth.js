import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    const header = req.headers['authorization'];
    
    if (!header) {
        res.status(401).send({ message: "Token não fornecido" });
        return;
    }

    const token = header.split(' ')[1]; // Extraindo o token do cabeçalho

    if (!token) {
        res.status(401).send({ message: "Token não fornecido" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        console.log('foi');
        
        next();
    } catch (error) {
        console.log(error);
        
        res.status(401).send({ message: "Token inválido" });
    }
}

export default auth;