import mongoose from "mongoose";

let options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10
};

mongoose.connect(process.env.DATABASE_URI, options);
mongoose.connection.on('error', () => console.log('Error connecting to database'));
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection'));

export default mongoose.connection;