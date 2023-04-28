const mongoose = require("mongoose");
const SportsCol = require("./models/sports-model");

exports.handler = async function(event, context) {
  let arr = [];
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await SportsCol.find({});
    arr = data
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(arr)

  };
}
