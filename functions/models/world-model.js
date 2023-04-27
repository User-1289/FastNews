// models/world.js
const mongoose = require("mongoose");

const WorldCol = mongoose.model('world-news', { author: String });

module.exports = WorldCol;
