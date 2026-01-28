const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        kh: { type: String, required: true },
        en: { type: String, required: true },
        ch: { type: String }
    },
    slug: { 
        type: String, 
        unique: true, 
        lowercase: true 
    },
    content: {
        kh: { type: String, required: true },
        en: { type: String, required: true },
        ch: { type: String }
    },
    image: {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Reference to your Admin model
        required: true
    },
    tags: [String], // e.g., ['Skincare', 'Massage', 'Promotion']
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;