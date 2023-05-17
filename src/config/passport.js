import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user.js'

export default function configurePassport(passport) {
  passport.use(
    'local-strategy',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log('email is not found')
            return done(null, false, {
              message: 'That email is not registered',
            })
          }

          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              console.log('password match fialed  not found')
              return done(err)
            }

            if (isMatch) {
          
              return done(null, user)
            } else {
              return done(null, false, { message: 'Password incorrect' })
            }
          })
        })
        .catch((err) => {
          console.log('something  happened found')
          return done(err)
        })
    })
  )

  passport.serializeUser(function (user, done) {
   
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    
    User.findById(id)
      .then((user) => {
        done(null, user)
      })
      .catch((err) => {
        done(err)
      })
  })
}
