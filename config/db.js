// const mongoose = require('mongoose');

// const connectionDB = async(req , res) => {
//     try{
//         await mongoose.connect(process.env.DATABASE_URL);
//         console.log('connection successfully');
//     }catch(error){
//         console.log(error)
//     }
// }

// module.exports = connectionDB;

const mongoose = require('mongoose');

const connectionDB = async () => {
    // ប្រសិនបើមានការតភ្ជាប់រួចហើយ មិនបាច់តភ្ជាប់ម្តងទៀតទេ
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connection successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // ក្នុង Serverless យើងមិនគួរទុកឱ្យ Error ស្ងាត់ស្ងៀមទេ
        throw error; 
    }
}

module.exports = connectionDB;