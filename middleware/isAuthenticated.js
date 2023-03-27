module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.sendStatus(401)
  }
  next()
}
