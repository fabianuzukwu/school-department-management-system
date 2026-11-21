require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGOOSE_URI

mongoose.connect(URI)
.then(()=>{
    console.log('Connected to the database successfully')
})
.catch((error)=>{
    console.log('Connection to the database failed', error.message)
})