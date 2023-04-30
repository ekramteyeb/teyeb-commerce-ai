// productRoutes.js
import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product/productApiController.js'

const productRouter = express.Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/:id', getProductById)
productRouter.post('/products', createProduct)
productRouter.put('/products/:id', updateProduct)
productRouter.delete('/products/:id', deleteProduct)

export default productRouter
