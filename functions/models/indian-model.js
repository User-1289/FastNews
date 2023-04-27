// models/world.js
const mongoose = require("mongoose");

const IndianCol = mongoose.model('indian-news', { author: String });

module.exports = IndianCol;
