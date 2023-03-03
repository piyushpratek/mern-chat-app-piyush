const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(id);
};
