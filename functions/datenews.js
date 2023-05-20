const dateCol = require("./models/date-col");
const mongoose = require("mongoose")


exports.handler = async function(event, context) {
  const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1
const day = today.getDate()
let todayDate = year + '-' + month + '-' + day

  let newsName = JSON.parse(event.body).newsVar + '-news'

  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


   //await document.save()
  // let id = '64688334b9782e177893e41d'
  // await dateCol.findByIdAndUpdate(id, { DateVisited:"2023-5-21"}, { new: true });
   let query = {CategoryName:newsName.toLowerCase()}
  // let query = {_id:"64688334b9782e177893e41d"}
   let data = await dateCol.find(query).exec()
   if(data.length===1)
   {
   const numericalId = data[0]._id.valueOf();
   await dateCol.findByIdAndUpdate(numericalId, { DateVisited:todayDate}, { new: true });
console.log(numericalId);
   }
   else if(data.length<1)
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