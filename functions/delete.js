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
  let delCat = JSON.parse(event.body).categoryName;
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const filter = { _id: '645686c39e2459f0b58b16f7' };
// Specify the array field and the value to delete
const update = { $pull: { Category: delCat } };
const result = await delCol.updateOne(filter, update);

  console.log(`Updated ${result.nModified} document(s)`);

  let selCol = mongoose.model(delCat+'-news', dbSchema)
//
  //await selCol.deleteMany({})
  //.then(() => {
  //  console.log('All documents deleted!');
  //})
  //.catch((error) => {
  //  console.error(error);
  //});
  await selCol.collection.drop();
    console.log('Collection dropped successfully.');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully deleted" }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

 // try {
 //   let delVar = JSON.parse(event.body).categoryName;
//
 //   // Perform delete operation using delCol
//
 //   return {
 //     statusCode: 200,
 //     body: JSON.stringify({ message: "Successfully deleted item" })
 //   };
 // } catch (error) {
 //   console.error("Error deleting item:", error);
//
 //   return {
 //     statusCode: 500,
 //     body: JSON.stringify({ error: "Unable to delete item" })
 //   };
 // }
