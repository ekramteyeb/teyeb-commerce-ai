import express from 'express'
import {
  addItemToCart,
  getCartItems,
  renderCheckout,
} from '../controllers/cart/cartController.js'
import { ensureAuthenticated } from '../config/auth.js'
//import auth from '../middleware/auth'

const router = express.Router()

// Add item to cart

//for non logged in user 
router.post('/', (req, res) => {
  const { id, name, price } = req.body
  const cartItem = { id, name, price }

  if (!req.session.cart) {
    req.session.cart = []
  }

  req.session.cart.push(cartItem)

  res.redirect('/cart')
})

//router.post('/cart', auth, addItemToCart)
router.post('/', ensureAuthenticated, addItemToCart)


// Get cart items
router.get('/', ensureAuthenticated, getCartItems)

router.get('/', (req, res) => {
  const cart = req.session.cart || []
  //res.render('cart', { cart })
  res.status(200).json(cart)
})

router.get('/checkout', renderCheckout)

//render cart items display /carts
//router.get('/carts', renderCartItems)

export default router
