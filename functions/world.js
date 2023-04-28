const mongoose = require("mongoose");
const WorldCol = require("./models/world-model");

exports.handler = async function(event, context) {
  let arr = [];
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6wrbl7a.mongodb.net/News-data`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await WorldCol.find({});
    arr = data.map(doc => doc.toObject()); // Convert MongoDB documents to plain objects
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(arr)
  };
}
