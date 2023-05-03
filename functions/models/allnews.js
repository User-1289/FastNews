// models/world.js
const mongoose = require("mongoose");

const IndianCol = mongoose.model('News-category', { Category: [Array] });

module.exports = IndianCol;
