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
  const month = today.getMonth() + 1
  const day = today.getDate()
  let numDay = Number(day-1)
  let todayDate = year + '-' + month + '-' + day
  let yesterdayDate = year + '-' + month + '-' + numDay

  let newsKey = JSON.parse(event.body).uniqueKey

  if(newsKey!=process.env.REACT_APP_UNIQUE_KEY)
  {
    return{
      statusCode:500,
      body:JSON.stringify({message: "You don't have the rights to use this endpoint"})
    }
  }
  
  let newsVar = JSON.parse(event.body).newsVar;
 // console.log(news)
  let isExisting = false;
  let newsConv;
  let arr = [];
  let queryCol;
  let times = 0;
  let userSelDoc = newsVar + "-news";

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const docs = await CatCol.find().exec();
    arr = docs;
    delete mongoose.connection.models["news-category"];
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error connecting to MongoDB Atlas" }),
    };
  }

  newsConv = newsVar.charAt(0).toUpperCase() + newsVar.slice(1) + "Col";

  for (let i = 0; i < arr[0].Category.length; i++) {
    if (arr[0].Category[i] == newsConv) {
      console.log('i exists')
      // queryCol = arr[0].Category[i]
      isExisting = true;
      break;
    } else {
      console.log("i don't exist")
      // delete mongoose.connection.models[newsVar + '-news'];
      isExisting = false;
    }
  }

  if (isExisting === true) {
    let queryCol = mongoose.model(userSelDoc, createSchema);
    let catArr = [];
    try {
      const data = await queryCol.find({});
      delete mongoose.connection.models[userSelDoc];
      catArr = data.map((doc) => doc.toObject()); // Convert MongoDB documents to plain objects
      // queryCol = ''
    } catch (error) {
      console.log("Error querying database:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error querying database" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(catArr),
    };
  } else if (isExisting === false) 
  {
    let createCol = mongoose.model(newsVar + "-news", createSchema);
    let newsArr;
    try {
     // const response = await axios.get(
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${newsVar}&from=${yesterdayDate}&to=${todayDate}&sortBy=publishedAt&language=en&apiKey=27c7158d2aa84e4fb8eaaac70115d729`)
        //);
      newsArr = response.data.articles;
      for (let i = 0; i <= 19; i++) 
      {
        let myDocument = new createCol({
          author: newsArr[i].author,
          content: newsArr[i].content,
          description: newsArr[i].description,
          publishedAt: newsArr[i].publishedAt,
          title: newsArr[i].title,
          url: newsArr[i].url,
          urlToImage: newsArr[i].urlToImage,
        });
        myDocument
          .save()
          .then(() => {
            times++;
            console.log("Document saved to MongoDB Atlas");
          })
          .catch((error) => {
            console.log(
              "Error saving document to MongoDB Atlas:",
              error
            );
          });
      }
    }
    catch (error) {
      console.log("Error fetching news from API:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error fetching news from API" }),
      };
    }
    }
    delete mongoose.connection.models[userSelDoc];
    
    let getCats = await CatCol.findOneAndUpdate(
    { _id: "645686c39e2459f0b58b16f7" },
    { $push: { Category: newsConv } },
    { new: true }
    );
    
    console.log(getCats);
    return {
    statusCode: 404,
    body: JSON.stringify({ message: "Saved" }),
    };
    };
    
    
    