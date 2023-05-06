const mongoose = require("mongoose");
const CatCol = require("./models/allnews");
const axios = require("axios");
require("dotenv").config();

exports.handler = async function(event, context) {
  const mongoose = require('mongoose');

// connection URL and database name

// create a new mongoose connection instance
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Error connecting to database:', error));

// define schema for the collection
//const mySchema = new mongoose.Schema({
//  Category: Array
//});
//
//// create model from the schema
//const MyModel = mongoose.model('news-categories', mySchema);

// create a new document with array field
const myDoc = new CatCol({
  Category: ["IndianCol", "WorldCol", "SportsCol", "BusinessCol", "EntertainmentCol", "TechnologyCol"]
});

// save the document to the collection
myDoc.save()
  .then(() => console.log('Document saved to collection'))
  .catch((error) => console.log('Error saving document to collection:', error));
  return{
    statusCode:200,
    body:JSON.stringify('hello handsome')
  }
};
