require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  authToken: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).send('You are not authenticated!');
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      req.user = decoded;
      next();
    });
  },
};
