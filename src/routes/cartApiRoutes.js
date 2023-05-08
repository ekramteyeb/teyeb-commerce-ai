import express from 'express'
import  { isAdmin }  from '../middlewares/auth.js'
import {
  getAllCarts,
  getCart,
  deleteCart, 
  removeAllCarts,
} from '../controllers/cart/catApiController.js'

const router = express.Router()

router.get('/', getAllCarts)
router.get('/:id', getCart)
router.delete('/',isAdmin, removeAllCarts)
router.delete('/:id',isAdmin, deleteCart)

export default router 
 