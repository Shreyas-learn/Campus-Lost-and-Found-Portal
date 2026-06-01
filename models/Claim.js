const mongoose = require("mongoose")

const ClaimSchema = new mongoose.Schema({

item_id:{
type: mongoose.Schema.Types.ObjectId,
ref:"FoundItem"
},

claimed_by:String,

message:String,

status:{
type:String,
default:"pending"
},

created_at:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Claim", ClaimSchema)