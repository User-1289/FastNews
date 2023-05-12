const delCol = require("./models/allnews");
const mongoose = require("mongoose")
const dbSchema = new mongoose.Schema({
  author: String,
  content: String,
  description: String,
  publishedAt: String,
  title: String,
  url: String,
  urlToImage: String,
});

exports.handler = async (event, context) => {
  let newsKey = JSON.parse(event.body).uniqueKey

  if(newsKey!=process.env.REACT_APP_UNIQUE_KEY)
  {
    return{
      statusCode:500,
      body:JSON.stringify({message: "You don't have the rights to use this endpoint"})
    }
  }
  let delCat = JSON.parse(event.body).categoryName;
  let delWord = delCat.charAt(0).toUpperCase() + delCat.slice(1) + "Col";
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const filter = { _id: '645686c39e2459f0b58b16f7', Category: delWord };
    const update = { $pull: { Category: delWord } };
    const result = await delCol.updateOne(filter, update);
    

  console.log(`Updated ${result.nModified} document(s)`);

  let selCol = mongoose.model(delCat+'-news', dbSchema)

  await selCol.collection.drop();
    console.log('Collection dropped successfully.');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully deleted", code:delCat })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};


