import mongoose from "mongoose";

let card = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model('card', card);
