const mongoose = require("mongoose");

const dateCol = mongoose.model('news-dates',{ DateVisited: String, CategoryName:String });

module.exports = dateCol;