const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const CatCol = require("./models/allnews");

const createSchema = new mongoose.Schema({
  author: String,
  content: String,
  description: String,
  publishedAt: String,
  title: String,
  url: String,
  urlToImage: String,
});

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

exports.handler = async (event, context) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayDate = getFormattedDate(today);
  const yesterdayDate = getFormattedDate(yesterday);

  try {
    const { uniqueKey, newsVar } = JSON.parse(event.body);

    if (uniqueKey !== process.env.REACT_APP_UNIQUE_KEY) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "You don't have the rights to use this endpoint" }),
        headers: responseHeaders,
      };
    }

    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const docs = await CatCol.find().exec();
    const categoryExists = docs[0].Category.some(
      (category) => category === `${newsVar.charAt(0).toUpperCase() + newsVar.slice(1)}Col`
    );

    const newsModelName = `${newsVar}-news`;
    const NewsModel = mongoose.model(newsModelName, createSchema);

    if (categoryExists) {
      const data = await NewsModel.find({}).exec();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: responseHeaders,
      };
    }

    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: newsVar,
        from: yesterdayDate,
        to: todayDate,
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const newsArr = response.data.articles;

    const newsDocuments = newsArr.map((article) => new NewsModel(article));
    await NewsModel.insertMany(newsDocuments);

    await CatCol.findByIdAndUpdate(
      "64678d02bf08f3e5daedce28",
      { $push: { Category: `${newsVar.charAt(0).toUpperCase() + newsVar.slice(1)}Col` } },
      { new: true }
    );

    mongoose.connection.close();

    return {
      statusCode: 200,
      body: JSON.stringify(newsArr),
      headers: responseHeaders,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
      headers: responseHeaders,
    };
  }
};
