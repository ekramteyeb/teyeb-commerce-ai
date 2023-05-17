import express from 'express'
const router = express.Router()
import passport from 'passport'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

import {
  ensureAuthenticated,
  forwardAuthenticated,
} from '../middlewares/auth.js'

// Protected route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  console.log(req.session, ' login is user ')
  console.log(req.session.user, ' login is user ')
  res.render('dashboard')
})

// Login Page
router.get('/login', forwardAuthenticated, (req, res) =>
  res.render('login', {
    message: req.flash('error')[0],
  })
)

// Register Page
router.get('/register', forwardAuthenticated, (req, res) =>
  res.render('register')
)

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' })
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    // Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User already exists
        errors.push({ msg: 'Email already registered' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })

        newUser
          .save()
          .then((user) => {
            console.log(user, ' user registerd')
            req.flash('success_msg', 'You are now registered and can log in')
            res.redirect('/auth/login')
          })
          .catch((err) => console.log(err))

        // Hash Password
        /* bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            // Set password to hashed
            newUser.password = hash
            // Save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                )
                res.redirect('/users/login')
              })
              .catch((err) => console.log(err))
          })
        ) */
      }
    })
  }
})

// Login Handle form submit
router.post('/login', (req, res, next) => {
  passport.authenticate('local-strategy', (err, user, info) => {
    if (err) {
      req.flash('error', 'Invalid email or password')
      return next(err)
    }
    if (!user) {
      req.flash('error', 'Invalid email or password')
      return res.redirect('/auth/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash('error', 'user not found')
        return next(err)
      }
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }

      return res.redirect(user.isAdmin ? '/auth/dashboard' : '/products')
    })
  })(req, res, next)
})

/* router.post('/login', (req, res, next) => {
  passport.authenticate('local-strategy', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next)
}) */
/* router.post('/login', (req, res, next) => {
  passport.authenticate('local-strategy', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, (err) => {
    if (err) return next(err)
    req.login(req.user, (err) => {
      if (err) return next(err)
      console.log(req.user, ' user ')
      req.session.user = req.user // attach user object to session
      res.redirect('/auth/dashboard')
    })
  })
}) */
/* req.session.user = {
                id: user._id,
                email: user.email,
              } */
// Logout Handle
/* router.get('/logout', (req, res) => {
  
  
  
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/auth/login')
}) */

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error : Failed to destroy the session during logout.', err)
        return next(err)
      }
      res.redirect('/auth/login')
    })
  })
})
router.get('/profile', ensureAuthenticated, async (req, res) => {
  //const user = req.session.user
  /*  try {
    const user = User.findById(req.session.user.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    console.log('user from userRoutes', user)
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  } */
  const user = await User.findById(req.session.user.id)

  res.render('profile', { user })
})

// Assuming you're using Express.js
router.post('/editPersonalInfo', ensureAuthenticated, async (req, res) => {
  // Set editingPersonalInfo to true
  /*  const user = req.body
  console.log(req.session.user, 'req.session.user')
  console.log(req.body, 'data from req.body')
  res.json({ user, editingPersonalInfo: true }) */
  //res.json('profile', { user, editingPersonalInfo: true })
  try {
    const userId = req.session.user.id
    const user = req.body
  

    // Update the user in the database
    await User.findByIdAndUpdate(userId, user)

    // Get the updated user from the database
    const updatedUser = await User.findById(userId)
    
    // Return the updated user as JSON response
    
    res.json({ user: updatedUser, editingPersonalInfo: true })
  } catch (error) {
    // Handle any errors that occurred during the database operations
    console.log(error)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the user.' })
  }
})

router.get('/editAddress', ensureAuthenticated, (req, res) => {
  // Set editingAddress to true
  const user = req.session.user
  res.render('profile', { user, editingAddress: true })
})

export default router
