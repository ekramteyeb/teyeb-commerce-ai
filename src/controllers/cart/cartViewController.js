import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
import Cart from '../../models/cart.js'

// Add item to cart
export const addItemToCart = async (req, res) => {
  try {
    const { id, quantity,name, price } = req.body
    console.log(req.body, 'req body  in cart ')
    const user = req.user._id
    const cart = await Cart.findOne({ user: user })

    if (cart) {
      // If the user's cart already exists, update it
      const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === id
      )
      if (itemIndex > -1) {
        // If the product already exists in the cart, increase its quantity
        cart.items[itemIndex].quantity += quantity
      } else {
        // If the product doesn't exist in the cart, add it
        cart.items.push({ id,name, price, quantity})
      }
      await cart.calculateTotal()

      const updatedCart = await Cart.findOne({
        user: user,
      }).populate('items.product', '_id name price quantity')
      //res.status(201).json(updatedCart)
       console.log(updatedCart, 'updated cart ')
      res.redirect('products')
    } else {
      // If the user's cart doesn't exist, create it
      const newCart = await Cart.create({
        user: user,
        items: [{ id, price, name, quantity }],
      })
      const createdCart = await Cart.findOne({
        user: user,
      }).populate('items.product', '_id name price quantity')
      console.log(createdCart , 'created cart ')
      //res.status(201).json(createdCart)
      res.redirect('/products')
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

// Get cart items
export const getCartItems = async (req, res) => {
  try {
    
    //const userId = req.session.id &&  new ObjectId(req.session.id)
    const userId = req.session.user.id && req.session.user.id
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.product',
      '_id name price quantity'
    )
    
    res.status(200).json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

/* export const renderCartItems = async (req, res) => {
  try {
    // convert string to ObjectId
    console.log(req.body.user, 'user available')
    const userId = req.body.user && new ObjectId(req.body.user_id)
    const user = req.body.user && req.body.user
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.product',
      '_id name price'
    )
    res.render('cart', { cart, user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
} */

export const renderCheckout = async (req, res) => {
  try {
    // convert string to ObjectId
    const userId = req.body.user && new ObjectId(req.body.user_id)
    console.log(req.user, ' user check out')
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.product',
      '_id name price quantity'
    )
    res.render('checkout', { cart })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}
