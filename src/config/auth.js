/* export const ensureAuthenticated = (req, res, next) => {
  console.log(req.user, 'request loged in user')
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error_msg', 'Please log in to view this page')
  res.redirect('/auth/login')
}

export const forwardAuthenticated = (req, res, next) => {
  console.log(req.user, 'request in ensure authenticated')
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/dashboard')
}
 */

export const ensureAuthenticated = (req, res, next) => {
  
  if (req.isAuthenticated()) {
   
    return next()
  }
  req.flash('error_msg', 'Please log in to view this page')
  res.redirect('/auth/login')
}

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/dashboard')
}
