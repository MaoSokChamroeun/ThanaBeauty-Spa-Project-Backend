const mongoose = require('mongoose');

const connectionDB = async () => { 
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connection successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
}

module.exports = connectionDB;