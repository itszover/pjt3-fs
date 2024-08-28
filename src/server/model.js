import mongoose from "mongoose";

const cards = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model('card', cards);