import express from 'express'
import Product from '../models/product.js'

const router = express.Router()

// Get Home page
router.get('/', async (req, res) => {
  try {
    const newsItems = [
      {
        id: 1,
        title: 'All food consumed at once',
        discripion: 'bla bala bala ba',
      },
      {
        id: 2,
        title: 'Good product stays in your memory',
        discripion: 'bla bala bala ba',
      },
      {
        id: 3,
        title: 'Preciouse goods last until you sale it ',
        discripion: 'bla bala bala ba',
      },
    ]
    const testimonials = [
      {
        id: 11,
        text: 'Well organized, fast delivery, very satisfied',
        name: 'Asheref Mohamed',
        company: 'Qred Laina',
      },
      {
        id: 22,
        text: 'I definitely recommed to my friends and family',
        name: 'Abrhamovich',
        company: 'Wagner',
      },
      {
        id: 33,
        text: "Customer service can't be any better",
        name: 'Richard Moze',
        company: 'Mafia',
      },
      {
        id: 44,
        text: 'Well organized, fast delivery, very satisfied',
        name: 'Mashiro kiro',
        company: 'Zizo Laina',
      },
      {
        id: 55,
        text: 'I definitely recommed to my friends and family',
        name: 'Gramova',
        company: 'Wagner',
      },
      {
        id: 66,
        text: "Customer service can't be any better",
        name: 'Garziato Achome',
        company: 'Guraze',
      },
    ]
    const products = await Product.find()
    res.render('home', { products, newsItems, testimonials })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get about
router.get('/about', async (req, res) => {
  res.render('about')
})

// Get contact
router.get('/contact', async (req, res) => {
  res.render('contact')
})

export default router
