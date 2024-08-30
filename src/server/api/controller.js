import card from "./card.js";

function index(req, res) {
    res.send("Olá");
}

function login(req, res) {
    res.send("Hello World pt 3");    
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