const express = require("express")
const router = express.Router()

const LostItem = require("../models/LostItem")

router.post("/reportLost", async(req,res)=>{

try{

const item = new LostItem(req.body)

await item.save()

res.json(item)

}

catch(err){

res.status(500).json(err)

}

})

router.get("/lostItems", async(req,res)=>{

const items = await LostItem.find()

res.json(items)

})

module.exports = router