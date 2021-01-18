module.exports = function (req, res, next) {
  if (req.user) {
    return next()
  }

  return res
    .status(401)
    .json({ err: 'Login required to view this information.' })
}
