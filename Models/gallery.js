const mongoose = require('mongoose')
const gallerySchema = new mongoose.Schema({
    title:{type: String, required: true},
    // date:{type: Date, required: true},
    image:{type: String, required: true},
}, {timestamps: true})

const galleryModel = mongoose.model('hero', gallerySchema);
module.exports = galleryModel