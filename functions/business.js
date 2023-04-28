const mongoose = require("mongoose");
const BusinessCol = require("./models/business-model");
console.log(typeof process.env.DB_URI)
exports.handler = async function(event, context) {
  let arr = [];
  try {
    await mongoose.connect(process.env.DB_URI, {
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
