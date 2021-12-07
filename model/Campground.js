var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator')

mongoose.plugin(slug)
module.exports = mongoose.model("Campground",mongoose.Schema({
    title: String,
    slug: {
     type: String,
      slug: "title" 
    },
    price: String,
    description: String,
    location: String,
    longitude: String,
    latitude : String
}))