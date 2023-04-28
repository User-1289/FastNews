const mongoose = require("mongoose");
const IndianCol = require("./models/indian-model");
require('dotenv').config
console.log(process.env.DB_URI)
exports.handler = async function(event, context) {
  let arr = [];
  try { 
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await IndianCol.find({});
    arr = data.map(doc => doc.toObject()); // Convert MongoDB documents to plain objects
    return {
      statusCode: 200,
      body: JSON.stringify(arr)
    };
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error: " + error.message })
    };
  }
};
