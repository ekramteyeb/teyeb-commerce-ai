import express from 'express'
import Product from '../models/product.js'

const router = express.Router()

// Get all products
/* router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.render('index', { products })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) */

// Route for displaying paginated products
router.get('/', (req, res) => {
  // Get the limit parameter from the request query or use a default value
  const limit = parseInt(req.query.limit) || 10

  // Get the current page number from the request query or use the first page
  const currentPage = parseInt(req.query.page) || 1

  // Calculate the offset based on the limit and the current page number
  const offset = (currentPage - 1) * limit

  // Query the database to get the products based on the limit and offset

  Product.find()
    .skip(offset)
    .limit(limit)
    .then((products) => {
      // Calculate the total number of pages based on the number of products and the limit
      const totalPages = Math.ceil(products && products.length / limit)
      const pages = totalPages
      // Render the products template with the products, current page number, total pages, and limit
      res.render('products', {
        products,
        currentPage,
        totalPages,
        pages,
        limit,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving products')
    })
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.render('product', { product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create new product
router.post('/', async (req, res) => {
  const { name, price, description, image } = req.body
  const product = new Product({ name, price, description, image })

  try {
    await product.save()
    res.redirect('/products')
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
