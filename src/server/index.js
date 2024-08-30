import app from "./app.js";
import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URI);
mongoose.connection.on('error', () => console.log('Error connecting to database'));
mongoose.connection.once('open', () => console.log('Connected to database'));

app.listen(process.env.PORT, () => console.log("Server is running on port 3000"));
