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
  // User is not authenticated, store the original requested URL in the session
  req.session.returnTo = req.originalUrl
  res.redirect('/auth/login')
}

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  // After successful authentication
  if (req.session.returnTo) {
    // Redirect the user to the stored URL
    const returnTo = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(returnTo);
  } else {
    // Redirect to a default page if there is no stored URL
    res.redirect('/dashboard');
    //res.redirect('/dashboard')
  }
}
