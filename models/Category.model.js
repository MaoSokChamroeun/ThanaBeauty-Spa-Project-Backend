const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    path : {
        type : String,
        required : true
    }
}, {timestamps : true});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category