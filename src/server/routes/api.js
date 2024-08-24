import express from "express";

let router = express.Router();

router.get("/", function (req, res) { res.send("Hello World pt 3"); });

export default router;
