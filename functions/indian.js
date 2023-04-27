exports.handler = async function(event, context) {
  const mongoose = require("mongoose");
  let arr = [];
  try {
    await mongoose.connect("mongodb+srv://ar1289:Seenu1146%23@cluster0.6wrbl7a.mongodb.net/News-data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");

    const IndianCol = mongoose.model("indian-news", { author: String });
    const data = await IndianCol.find({});
    arr = JSON.stringify(data);

    return {
      statusCode: 200,
      body: arr,
    };
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
