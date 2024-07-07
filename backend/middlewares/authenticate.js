const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    //return res.status(401).json({ message: 'No authorization token provided' });
  }

  try {
    //const token = req.headers.authorization.split(' ')[1];
    const token = jwt.sign({ id: 1, role: 1 }, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authenticate;
