const mongoose = require('mongoose');

const connectionDB = async(req , res) => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('connection successfully');
    }catch(error){
        console.log(error)
    }
}

module.exports = connectionDB;
