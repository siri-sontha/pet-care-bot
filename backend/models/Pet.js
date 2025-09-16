const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Dog, Cat
    age: { type: Number },
    info: { type: String }, // Pet care information
});

module.exports = mongoose.model('Pet', petSchema);
