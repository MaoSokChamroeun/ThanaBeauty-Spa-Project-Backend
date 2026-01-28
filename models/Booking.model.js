const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    client_name : {
        type : String,
        required : [true , 'Client name are required']
    },
    phone : {
        type : String
    },
    service : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Service',
        required : true
    },
    package : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Package',
        required : true
    },
    status : {
        type : String,
        enum : [
            "cancel",
            "pending",
            "complete"
        ]
    },
    description : {
        type : String,
    }
},{timestamps : true});

const Booking = mongoose.model('Booking' , bookingSchema);
module.exports = Booking