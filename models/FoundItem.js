const mongoose = require("mongoose")

const FoundItemSchema = new mongoose.Schema({

title:String,

description:String,

category:String,

location_found:String,

date_found:Date,

image:String,

status:{
type:String,
default:"found"
},

returned:{
type:Boolean,
default:false
},

returned_date:Date

})

module.exports = mongoose.model("FoundItem",FoundItemSchema)