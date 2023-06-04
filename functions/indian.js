const mongoose = require("mongoose");
const CatCol = require("./models/allnews");
const axios = require("axios");
require("dotenv").config();

exports.handler = async function(event, context) {
  return{
    statusCode:200,
    body:JSON.stringify('hello handsome')
  }
};
