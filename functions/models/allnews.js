// models/world.js
const mongoose = require("mongoose");

const IndianCol = mongoose.model('news-category', { Category: [Array] });

module.exports = IndianCol;
