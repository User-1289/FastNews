const mongoose = require("mongoose");

const TechnologyCol = mongoose.model('technology-news', { author: String });

module.exports = TechnologyCol;