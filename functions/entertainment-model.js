const mongoose = require("mongoose");

const EntertainmentCol = mongoose.model('entertainment-news', { author: String });

module.exports = EntertainmentCol;