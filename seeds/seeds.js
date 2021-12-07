require("dotenv").config();
const mongoose = require('mongoose');
const Campground = require('../model/Campground');
const { descriptors, places, location } = require("./seedshelper");


//db
let db 
if (process.env.NODE_ENV == "development") {
  db = require("../config/config").mongoURI;
} else {
  db = process.env.mongoURI;
}


mongoose
  .connect(db, {  
     useNewUrlParser: true,
     useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
  .then(process.env.NODE_ENV == "development" ? () => console.log("server connected") : "")
  .catch((error)=>{
    console.log(error);
  })
let sample = array => array[Math.floor(Math.random() * array.length)];

  const seedDB = async () => {
     
      await Campground.deleteMany({})
      for (let index = 0; index < 50; index++) {
         let latitude =  Math.random() * 999.820
        let longitude = Math.random() * 999.820
     let random6 = Math.floor(Math.random() * 6)
      await new Campground({
        title: `${sample(descriptors)} ${sample(places)}`,
        location: `${location[random6].name}`,
        longitude,
        latitude
    }).save().then(camp=>console.log(camp)) 
}
mongoose.connection.close()
  }
module.exports = seedDB
  