import express from 'express'
import {
  addItemToCart,
  getCartItems,
  renderCheckout,
} from '../controllers/cart/cartController.js'
//import auth from '../middleware/auth'

const router = express.Router()

// Add item to cart
//router.post('/cart', auth, addItemToCart)
router.post('/', addItemToCart)

// Get cart items
router.get('/', getCartItems)
router.get('/checkout', renderCheckout)

//render cart items display /carts
//router.get('/carts', renderCartItems)
export default router
