import express from "express";
import cors from "cors"
import api from "./api/route.js";
import 'dotenv/config';

let app = express();

app.use(cors())
app.use(express.json());

app.use("/api", api);

export default app;
