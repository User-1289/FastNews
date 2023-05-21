// models/world.js
const mongoose = require("mongoose");

const IndianCol = mongoose.model('news-categories', { Category: [String] });

module.exports = IndianCol;
