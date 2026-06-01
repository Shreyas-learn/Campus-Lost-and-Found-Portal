const mongoose = require("mongoose")

const LostItemSchema = new mongoose.Schema({

title: String,

description: String,

category: String,

location_lost: String,

date_lost: Date,

image: String,

status:{
type:String,
default:"lost"
}

})

module.exports = mongoose.model("LostItem", LostItemSchema)