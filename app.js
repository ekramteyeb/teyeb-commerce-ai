import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import LocalStrategy from 'passport-local'
import configurePassport from './src/config/passport.js'
import session from 'express-session'
import  MemoryStore from 'memorystore'

import productRouter from './src/routes/productApiRoutes.js'
import productViewRouter from './src/routes/productViewRoutes.js'
import cartRouter from './src/routes/cartRoutes.js'
import cartApiRouter from './src/routes/cartApiRoutes.js'
import navRoutes from './src/routes/navRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import authRouter from './src/routes/authRoutes.js'
import Product from './src/models/product.js'
import path from 'path'
import db from './src/config/database.js'
import { renderCartItems } from './src/controllers/cart/cartController.js'

const app = express()

const MemoryStoreFactory = MemoryStore(session)
const store = new MemoryStoreFactory({
  checkPeriod: 86400000, // prune expired entries every 24h
})

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    /* cookie: { secure: true }, */ //think how to use this line :)
    store: store
  })
)
// make session available in all pug files
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})
/* app.use((req, res, next) => {
  console.log(req.session, 'app req.session')
  next()
}) */
app.use(express.json()) // middleware to parse JSON in the request body
app.use(express.urlencoded({ extended: true })) // middleware to parse URL-encoded data in the request body

// configure Passport with the authentication strategies
configurePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
const __dirname = path.dirname(new URL(import.meta.url).pathname)

// set user to app req object whic maks him available all over pug

app.use(flash())
// serve static files from public folder
app.use(express.static('public'))

//temporarily add user to app
/* app.use(function (req, res, next) {
  req.body.user = {
    _id: '644fc02f67ed7aa507bb7f01',
    name: 'hassen',
    email: 'hassen@gmail.com',
  }
  next()
}) */

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

//product api routers
app.use('/api/products', productRouter)
//product view routers
app.use('/products', productViewRouter)
//cart view routes
app.use('/cart', cartRouter)
app.use('/carts', renderCartItems)
//cart api routes
//app.use('/api/carts', cartApiRouter)
//vav pages routes
app.use('/', navRoutes)
//auth routers
app.use('/auth', authRouter)
//users routes
app.use('/users', userRoutes)

// Error handling : unavailable routes , etc
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
const handleUnavailableRoutes = (req, res, next) => {
  const error = new Error('Page Not Found')
  error.status = 404
  next(error)
}
app.use(handleUnavailableRoutes)

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', { error: err.message })
})

// Start server
const port = process.env.PORT || 3008

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
