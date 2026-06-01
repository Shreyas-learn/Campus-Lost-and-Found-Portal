const express = require("express")
const router = express.Router()

const FoundItem = require("../models/FoundItem")
const upload = require("../middleware/upload")

// ✅ Add Found Item (with image upload)
router.post("/reportFound", upload.single("image"), async (req, res) => {
  try {
    const item = new FoundItem({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location_found: req.body.location_found,
      date_found: req.body.date_found,
      image: req.file ? req.file.filename : null
    })

    await item.save()

    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error saving found item" })
  }
})


// ✅ Get ALL found items
router.get("/foundItems", async (req, res) => {
  try {
    const items = await FoundItem.find()
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching found items" })
  }
})


// ✅ Mark item as returned
router.post("/markReturned", async (req, res) => {
  try {
    const { item_id } = req.body

    const updatedItem = await FoundItem.findByIdAndUpdate(
      item_id,
      {
        returned: true,
        returned_date: new Date(),
        status: "returned"
      },
      { new: true }
    )

    res.json(updatedItem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error updating item" })
  }
})

module.exports = router