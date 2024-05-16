const mongoose = require("mongoose");
const CatCol = require("./models/allnews");
const axios = require("axios");
require("dotenv").config();

const createSchema = new mongoose.Schema({
  author: String,
  content: String,
  description: String,
  publishedAt: String,
  title: String,
  url: String,
  urlToImage: String,
});

exports.handler = async (event, context) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const yesterday = new Date(today);
  yesterday.setDate(day - 1);

  let yesterdayDate = `${year}-${month.toString().padStart(2, '0')}-${yesterday.getDate().toString().padStart(2, '0')}`;
  let todayDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const newsKey = JSON.parse(event.body).uniqueKey;

  if (newsKey !== process.env.REACT_APP_UNIQUE_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "You don't have the rights to use this endpoint" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      }
    };
  }

  const newsVar = JSON.parse(event.body).newsVar;
  let isExisting = false;
  let newsConv;
  let arr = [];
  let queryCol;

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const docs = await CatCol.find().exec();
    arr = docs;

    for (let i = 0; i < arr[0].Category.length; i++) {
      if (arr[0].Category[i] === newsVar.charAt(0).toUpperCase() + newsVar.slice(1) + "Col") {
        isExisting = true;
        newsConv = arr[0].Category[i];
        break;
      }
    }

    if (isExisting === true) {
      queryCol = mongoose.model(newsVar + "-news", createSchema);

      try {
        const data = await queryCol.find({});
        const catArr = data.map((doc) => doc.toObject());
        return {
          statusCode: 200,
          body: JSON.stringify(catArr),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
          }
        };
      } catch (error) {
        console.log("Error querying database:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Error querying database" }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
          }
        };
      }
    } else {
      queryCol = mongoose.model(newsVar + "-news", createSchema);

      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${newsVar}&from=${yesterdayDate}&to=${todayDate}&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`);
        const newsArr = response.data.articles;

        for (let i = 0; i <= 29; i++) {
          let myDocument = new queryCol({
            author: newsArr[i].author,
            content: newsArr[i].content,
            description: newsArr[i].description,
            publishedAt: newsArr[i].publishedAt,
            title: newsArr[i].title,
            url: newsArr[i].url,
            urlToImage: newsArr[i].urlToImage,
          });

          await myDocument.save();
        }

        await CatCol.findOneAndUpdate(
          { _id: "64678d02bf08f3e5daedce28" },
          { $push: { Category: newsConv } },
          { new: true }
        );

        mongoose.connection.close();

        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Saved" }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
          }
        };
      } catch (error) {
        console.log("Error fetching news from API:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Error fetching news from API " + error }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
          }
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error connecting to MongoDB Atlas" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      }
    };
  }
};
