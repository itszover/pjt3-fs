import express from "express";
import cors from "cors"
import api from "./routes/api.js";

let app = express();

app.use(cors())

app.use("/api", api);

export default app;
