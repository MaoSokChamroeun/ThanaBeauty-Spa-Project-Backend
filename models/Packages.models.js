const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    package_name : {
        type : String,
    },
    price : {
        type : Number
    },
    image : {
        type : String
    },
    description : {
        type : String,
        required : [true , 'description are required']
    }
})

const Packgae = mongoose.model('Package' , packageSchema);

module.exports = Packgae