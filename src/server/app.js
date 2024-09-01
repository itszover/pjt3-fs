import express from "express";
import cors from "cors"
import api from "./api/route.js";
import rateLimit from "express-rate-limit";
import compression from "compression";
import 'dotenv/config';

let app = express();

app.use(cors())
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(compression());

app.use(express.static("dist"));

app.use("/api", api);

export default app;