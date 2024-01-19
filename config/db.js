const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
