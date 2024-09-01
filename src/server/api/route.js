import express from "express";
import controller from "./controller.js";
import auth from "../middleware/auth.js";

let router = express.Router();

router.get("/", controller.index);
router.get("/select", auth, controller.select);
router.post("/insert", auth, controller.insert);
router.post("/login", controller.login);

export default router;