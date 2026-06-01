const express = require("express")
const router = express.Router()

const LostItem = require("../models/LostItem")
const FoundItem = require("../models/FoundItem")

router.get("/search", async(req,res)=>{

try{

const {type, location, category} = req.query

let query = {}

if(category){
  query.category = category
}

let result

if(type === "lost"){

  if(location){
    query.location_lost = location
  }

  result = await LostItem.find(query)

}
else{

  if(location){
    query.location_found = location
  }

  result = await FoundItem.find(query)

}

res.json(result)

}catch(err){
res.status(500).json(err)
}

})

module.exports = router

router.get("/match", async(req,res)=>{

try{

const lostItems = await require("../models/LostItem").find()
const foundItems = await require("../models/FoundItem").find()

let matches = []

lostItems.forEach(lost => {

  foundItems.forEach(found => {

    // simple matching logic
    if(
      lost.category === found.category &&
      found.title.toLowerCase().includes(lost.title.toLowerCase().split(" ")[0])
    ){
      matches.push({
        lost,
        found
      })
    }

  })

})

res.json(matches)

}catch(err){
console.error(err)
res.status(500).json({error:"Matching error"})
}

})