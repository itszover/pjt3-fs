import model from "./model.js";

function index(req, res) {
    let card = new model({ name: "Card 1", description: "This is card 1", image: "https://via.placeholder.com/150" });
    card.save();
    
    res.send("Carta criada com sucesso");
}

function login(req, res) {
    res.send("Hello World pt 3");    
}

function insert(req, res) {
    res.send("Hello World pt 3");
}

function select(req, res) {
    res.send("Hello World pt 3");
}

export default { index, login, insert, select };