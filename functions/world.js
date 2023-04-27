exports.handler = async function(event, context) {
  const mongoose = require("mongoose");
  let arr = [];
  try {
    await mongoose.connect("mongodb+srv://ar1289:Seenu1146%23@cluster0.6wrbl7a.mongodb.net/News-data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const WorldCol = mongoose.model('world-news', { author: String });
    const data = await WorldCol.find({});
    arr = JSON.stringify(data);
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }

  return {
    statusCode: 200,
    body: arr,
  };
}