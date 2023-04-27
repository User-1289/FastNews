const mongoose = require("mongoose");

let IndianCol;
let WorldCol;
let TechnologyCol;
let BusinessCol;
let SportsCol;
let EntertainmentCol;

let modelObj = 
{
IndianCol:mongoose.model('indian-news', { author: String }),
WorldCol:mongoose.model('world-news', { author: String }),
TechnologyCol:mongoose.model('technology-news', { author: String }),
BusinessCol:mongoose.model('business-news', { author: String }),
SportsCol:mongoose.model('sports-news', { author: String }),
EntertainmentCol:mongoose.model('entertainment-news', { author: String }),
}

module.exports = modelObj;
