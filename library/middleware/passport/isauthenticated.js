isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url
    }
    return res.redirect('/users/login')
  }
  next()
}

module.exports = isAuthenticated