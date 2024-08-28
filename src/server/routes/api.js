import express from "express";
import controller from "../apiController.js";

let router = express.Router();

router.get("/", controller.index);
router.get("/select", controller.select);
router.post("/insert", controller.insert);
router.post("/login", controller.login);

export default router;
