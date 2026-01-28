const mongoos = require('mongoose')

const bannerSchema = new mongoos.Schema({
    image: {
        type: String,
        required: true,
    },
},{ timestamps: true});

const Banner = mongoos.model('Banner', bannerSchema);

module.exports = Banner;
