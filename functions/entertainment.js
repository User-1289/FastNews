const mongoose = require("mongoose");
const EntertainmentCol = require("./models/indian-model");

exports.handler = async function(event, context) {
  let arr = [];
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await EntertainmentCol.find({});
    arr = data
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(arr)

  };
}
