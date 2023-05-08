import Cart from '../../models/cart.js'

// GET /api/cart - Get user's cart
//get all carts 
export const getAllCarts = async (req, res) => {
  try {
    //   const userId = req.user._id // Assuming user authentication is implemented

    const cart = await Cart.find()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getCart = async (req, res) => {
  try {
     const id = req.body.cartId // Assuming user authentication is implemented
    console.log(req.user, 'req body in getCart')
    const cart = await Cart.find({id:id})
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
// DELETE /api/carts/:id - Delete a specific cart
export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    await Cart.findByIdAndDelete(cartId);
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE all carts 
export const removeAllCarts = async (req, res) => {
  try {
    await Cart.deleteMany({})
    res.json({ message: 'All carts have been removed' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
