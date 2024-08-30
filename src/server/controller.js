import card from "./card.js";

function index(req, res) {
    res.send("Olá");
}

function login(req, res) {
    res.send("Hello World pt 3");    
}

function insert(req, res) { new card(req.body).save(); }

function select(req, res) {
    card.find({ name: { $regex: req.query.name || "", $options: "i" } }).then(cards => { res.send(cards); });
}

export default { index, login, insert, select };