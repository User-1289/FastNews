const mongoose = require("mongoose");
const BusinessCol = require("./business-model");

exports.handler = async function(event, context) {
  let arr = [];
  try {
    await mongoose.connect("mongodb+srv://ar1289:Seenu1146%23@cluster0.6wrbl7a.mongodb.net/News-data", {
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
    body: JSON.stringify(arr)

  };
}
