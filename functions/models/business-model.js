const mongoose = require("mongoose");

const BusinessCol = mongoose.model('business-news', { author: String });

module.exports = BusinessCol;