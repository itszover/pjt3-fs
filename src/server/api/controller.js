import card from "./card.js";
import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function index(req, res) {
    let user = new User({ username: "teste", password: "teste" });
    user.save()
    
    res.send("Olá");

}

async function login(req, res) {
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

function insert(req, res) {
    let { name, description, image } = req.body;

    if (!name || !description || !image) {
        res.status(400).send({ message: "Dados inválidos" });
        return;
    }

    new card(req.body).save();
    
    res.status(201);
}

async function select(req, res) {
    try {
        let cards = await card.find({ name: { $regex: req.query.name || "", $options: "i" } });
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar cartas" });
    }
}

export default { index, login, insert, select };