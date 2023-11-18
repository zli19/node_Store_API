require('dotenv').config()
// async errors
require('express-async-errors')


const express = require('express')
const app = express()


const connectDB = require('./db/connect')
const productRouter = require('./routes/productRoute')

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes

app.use('/api/v1/products', productRouter)
// products route

app.use(notFound)
app.use(errorHandler)

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