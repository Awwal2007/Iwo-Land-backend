const mongoose = require('mongoose')
const gallerySchema = new mongoose.Schema({
    title:{type: String, required: true},
    gallery:{type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true})

const galleryModel = mongoose.model('gallery', gallerySchema);
module.exports = galleryModel