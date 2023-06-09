const dateCol = require("./models/date-col");
const mongoose = require("mongoose")


exports.handler = async function(event, context) {
  let newsKey = JSON.parse(event.body).uniqueKey


  const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1
const day = today.getDate()
let todayDate = year + '-' + month + '-' + day

let checkToday = new Date(todayDate)
  let newsName = JSON.parse(event.body).newsVar + '-news'

  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

   let query = {CategoryName:newsName.toLowerCase()}
   let data = await dateCol.find(query).exec()
   if(data.length===1)
   {
    let dbDate = new Date(data[0].DateVisited)
      if(dbDate.toISOString()===checkToday.toISOString())
      {
        return{
          statusCode:200,
          body:JSON.stringify({message:"It have been updated"})
        }
      }
          else
          {
            const numericalId = data[0]._id.valueOf();
            await dateCol.findByIdAndUpdate(numericalId, { DateVisited:todayDate}, { new: true });
          }
   }
   else if(data.length==0)
   {
    let document =  new dateCol({
      DateVisited:todayDate,
      CategoryName:newsName.toLowerCase()
    })
    document.save()
    console.log("i deson't exists")
   }
console.log(data.length)
  // console.log(data[0]._id)
  }
  catch(err)
  {
    console.log(err)
  }
    return{
        statusCode:200,
        body:JSON.stringify({massage:'hello handsome ' + newsName})
      }
    };