import mongoose from 'mongoose'

const { Schema } = mongoose

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: {
        type: String,
        
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
})

cartSchema.methods.calculateTotal = function () {
  
  let total = 0
  this.items.forEach((item) => {
    total += item.price * item.quantity
  })
  this.total = total
  
  return this.save()
}

const Cart = mongoose.model('Cart', cartSchema)

export default Cart

