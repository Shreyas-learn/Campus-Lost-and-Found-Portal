const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const lostRoutes = require("./routes/lostRoutes")
const foundRoutes = require("./routes/foundRoutes")
const searchRoutes = require("./routes/searchRoutes")
const claimRoutes = require("./routes/claimRoutes")

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/lostfoundDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

//app.get("/",(req,res)=>{
//res.send("Lost and Found API Running")
//})


app.use("/uploads", express.static("uploads"))

app.use("/api",lostRoutes)
app.use("/api", foundRoutes)
app.use("/api", searchRoutes)
app.use("/api", claimRoutes)
app.listen(5000,()=>{
console.log("Server running on port 5000")
})