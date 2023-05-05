import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user.js'

export default function configurePassport(passport) {
  passport.use(
    'local-strategy',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
            .then(function (user) {
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
                        console.log('login success  ')
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                })
                
                passport.serializeUser(function (user, done) {
                    done(null, user.id)
                })

                passport.deserializeUser(function (id, done) {
                    User.findById(id, function (err, user) {
                    done(err, user)
                })
                })
            })
            .catch(function (err) {
             console.log('something  happened found')
            return done(err)
        })
          /* if (err) {
            console.log('something  happened found')
          return done(err)
            } */

          

        
        /*  // Match password
                 bcrypt.compare(password, user.password, (err, isMatch) => {
                   if (err) throw err
         
                   if (isMatch) {
                     return done(null, user)
                   } else {
                     return done(null, false, { message: 'Password incorrect' })
                   }
                 })
               }).catch((err) => console.log(err)) }) */

        
      })
  )
}
/* passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (!user.verifyPassword(password)) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

 */
