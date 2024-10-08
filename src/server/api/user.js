import mongoose from 'mongoose';

let user = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model('user', user);