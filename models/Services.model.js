const mongoose = require('mongoose')
const localizedString = {
    en : {type : String , default: ''},
    kh : {type : String , default: ''},
    ch : {type : String , default: ''}
}
const servicesSchema = new mongoose.Schema({
    title : localizedString,
    description : localizedString,
    price : {
        type : Number
    },
    duration : {
        type : Number,
        required : true
    },
    image : {
        type : String
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    }
},{timestamps : true})


const Service = mongoose.model('Service',servicesSchema);
module.exports = Service