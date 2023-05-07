const delCol = require("./models/allnews");

exports.handler = (event, context) => 
{
    let delVar = JSON.parse(event.body).categoryName;
    return{
        statusCode:200,
        body:JSON.stringify({test:delVar})
    }
}