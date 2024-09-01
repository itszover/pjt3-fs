import app from "./app.js";
import https from "https";
import db from "./config/database.js";

db.once('open', () => {
    https.createServer(app.listen(process.env.PORT, () => console.log("Server is running on port 3000")))
});
