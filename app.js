require('dotenv').config()
// async errors


const express = require('express')
const app = express()

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const exp = require('constants')

// middleware
app.use(express.json())

// routes

// products route

app.use(notFound)
app.use(errorHandler)

const connectDB = require('./db/connect')
const port = process.env.PORT || 5000
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listenning on port ${port}`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()