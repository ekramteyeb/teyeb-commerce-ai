import express from 'express'
import {
  addItemToCart,
  getCartItems,
  renderCheckout,
} from '../controllers/cart/cartViewController.js'
import { ensureAuthenticated } from '../middlewares/auth.js'
//import auth from '../middleware/auth'

const router = express.Router()

// Add item to cart
//router.post('/cart', auth, addItemToCart)
router.post('/', ensureAuthenticated, addItemToCart)

//for none logged in user

router.post('/', (req, res) => {
  const { id, name, price, quantity } = req.body
  const cartItem = { id, name, price, quantity }

  if (!req.session.cart) {
    req.session.cart = []
  }

  req.session.cart.push(cartItem)

  res.redirect('/cart')
})

// Get cart items
router.get('/', ensureAuthenticated, getCartItems)
//for non logged in user get cart items
router.get('/', (req, res) => {
  const cart = req.session.cart || []
  //res.render('cart', { cart })
  res.status(200).json(cart)
})

router.get('/checkout', ensureAuthenticated, renderCheckout)

//render cart items display /carts
//router.get('/carts', renderCartItems)

export default router
