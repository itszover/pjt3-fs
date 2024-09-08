import express from "express";
import controller from "./controller.js";
import auth from "../middleware/auth.js";

let router = express.Router();

router.get("/", controller.index);
router.get("/select", auth, controller.select);
router.get("/check-token", auth, controller.checkToken);
router.post("/insert", auth, controller.insert);
router.post("/login", controller.login);
router.post("/logout", auth, controller.logout);

export default router;