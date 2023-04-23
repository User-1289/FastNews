const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // add cors middleware

mongoose
  .connect("mongodb+srv://ar1289:Seenu1146%23@cluster0.6wrbl7a.mongodb.net/News-data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas:", error);
  });

app.listen(1000, () => {
  console.log("starting at port 1000");
});

const IndianCol = mongoose.model('indian-news', { author: String });
const worldCol = mongoose.model('world-news', { author: String });
const BusinessCol = mongoose.model('business-news', { author: String });
const sportsCol = mongoose.model('sports-news', { author: String });
const technologyCol = mongoose.model('technology-news', { author: String });
const entertainmentCOl = mongoose.model('entertainment-news', { author: String });

app.get("/indian", (req, res) => 
{
  IndianCol
    .find({})
    .then((data) => {
      const arr = JSON.stringify(data);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error"); // add error handling
    });
});

app.get("/world", (req, res) => 
{
  worldCol
    .find({})
    .then((data) => {
      const arr = JSON.stringify(data);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error"); // add error handling
    });
});

app.get("/business", (req, res) => 
{
  BusinessCol
    .find({})
    .then((data) => {
      const arr = JSON.stringify(data);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error"); // add error handling
    });
});
app.get("/technology", (req, res) => 
{
  technologyCol
    .find({})
    .then((data) => {
      const arr = JSON.stringify(data);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error"); // add error handling
    });
});
app.get("/sports", (req, res) => 
{
  sportsCol
    .find({})
    .then((data) => {
      const arr = JSON.stringify(data);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error"); // add error handling
    });
});
app.get("/entertainment", (req, res) => 
{
  entertainmentCOl
    .find({})
    .then((data) => {
      const arr = JSON.stringify(data);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error"); // add error handling
    });
});