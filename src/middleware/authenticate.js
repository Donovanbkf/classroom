function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send('No authenticate');
}

module.exports = {isAuthenticated: isAuthenticated}