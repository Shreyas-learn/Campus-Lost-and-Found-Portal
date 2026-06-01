const express = require("express")
const router = express.Router()
const Claim = require("../models/Claim")
console.log("ClaimRoutes loaded")
console.log("Approve route HIT")

router.post("/claimItem", async(req,res)=>{

try{

const claim = new Claim(req.body)

await claim.save()

res.json(claim)

}catch(err){
console.error(err)
res.status(500).json({error:"Error creating claim"})
}

})

// ✅ Get all claims
router.get("/claims", async(req,res)=>{

try{

const claims = await Claim.find()

res.json(claims)

}catch(err){
console.error(err)
res.status(500).json({error:"Error fetching claims"})
}

})

module.exports = router

const FoundItem = require("../models/FoundItem")

router.post("/approveClaim", async(req,res)=>{

try{

const {claim_id} = req.body

// Update claim
const claim = await Claim.findByIdAndUpdate(
  claim_id,
  { status: "approved" },
  { new: true }
)

// Check if claim exists
if(!claim){
  return res.status(404).json({error:"Claim not found"})
}

// Update found item
const mongoose = require("mongoose")

const updatedItem = await FoundItem.findByIdAndUpdate(
  new mongoose.Types.ObjectId(claim.item_id),
  {
    returned: true,
    status: "returned",
    returned_date: new Date()
  },
  { returnDocument: "after" }
)

console.log("Updated Item:", updatedItem)

res.json({
  message:"Claim approved",
  claim,
  updatedItem
})

}catch(err){
console.error(err)
res.status(500).json({error:"Error approving claim"})
}

})

router.post("/rejectClaim", async(req,res)=>{

try{

const {claim_id} = req.body

if(!claim_id){
  return res.status(400).json({error:"claim_id is required"})
}

const claim = await Claim.findByIdAndUpdate(
claim_id,
{ status: "rejected" },
{ new: true }
)

res.json({message:"Claim rejected", claim})

}catch(err){
console.error(err)
res.status(500).json({error:"Error rejecting claim"})
}

})