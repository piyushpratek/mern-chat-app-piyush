const jwt = require('jsonwebtoken');

export const generateToken = (id: String) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
