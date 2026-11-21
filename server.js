require('dotenv').config()
const express = require('express')
const app = express()
require('./Database/database')
const PORT = process.env.PORT || 3900
const departmentRouter = require('./routers/departmentRouter')
const courseRouter = require('./routers/courseRouter')


app.use(express.json())
app.use(departmentRouter)
app.use(courseRouter)







app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})