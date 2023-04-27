const mongoose = require("mongoose");

const SportsCol = mongoose.model('sports-news', { author: String });

module.exports = SportsCol;
