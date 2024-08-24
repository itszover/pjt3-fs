import app from "./app.js";
import mongoose from "mongoose";

// const DATABASE_URI = process.env.DATABASE_URI;

// database.connect(DATABASE_URI);
// database.connection.on('error', onErrorDB);
// database.connection.once('open', onListeningDB);

app.listen(3000, () => {console.log("Server is running on port 3000")});
