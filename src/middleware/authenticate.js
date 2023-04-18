function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send('No authenticate');
}

const checkRol = (rol) => (req, res, next) => {
  if (req.user.role === rol) {
    return next();
  }
  res.status(403).send('no tienes los derechos')
};

module.exports = { isAuthenticated, checkRol }