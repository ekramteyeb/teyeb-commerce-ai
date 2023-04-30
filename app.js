import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import productRouter from './src/routes/productApiRoutes.js'
import productViewRouter from './src/routes/productViewRoutes.js'
import navRoutes from './src/routes/navRoutes.js'
import Product from './src/models/product.js'
import path from 'path'
import db from './config/database.js'

const app = express()

const __dirname = path.dirname(new URL(import.meta.url).pathname)

app.use(express.json()) // middleware to parse JSON in the request body
app.use(express.urlencoded({ extended: true })) // middleware to parse URL-encoded data in the request body

// serve static files from public folder
app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

//product api routers
app.use('/api/products', productRouter)
//product view routers
app.use('/products', productViewRouter)
//vav pages routes
app.use('/', navRoutes)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
// Start server
const port = process.env.PORT || 3008

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
