import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    
    res.render('products/index', { products })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
     console.log( 'related products')
    const product = await Product.findById(req.params.id)
    const relatedProducts = await Product.find().filter(
      (prod) => prod.price % 5 == 0
    )
   
    res.render('products/show', { product, relatedProducts })
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
