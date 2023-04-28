const mongoose = require("mongoose");
require('dotenv').config
const BusinessCol = require("./models/business-model");
console.log(typeof process.env.DB_URI)
exports.handler = async function(event, context) {
  let arr = [];
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6wrbl7a.mongodb.net/News-data`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await BusinessCol.find({});
    arr = data
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(arr),
  };
}
