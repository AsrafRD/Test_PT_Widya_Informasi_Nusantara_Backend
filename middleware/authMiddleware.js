import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, "adsf3e534tfr453645gfsdv334363fdefgdsxf");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token.');
  }
};

export default authenticateToken;
