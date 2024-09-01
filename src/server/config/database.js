import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10
});

let database = mongoose.connection; 

mongoose.connection.on('error', () => console.error('Error connecting to database'));
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection'));

export default database;