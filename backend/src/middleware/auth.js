const jwt = require('jsonwebtoken');

module.exports = function requireAuth(role) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Unauthorized' });

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      if (role && payload.role !== role) return res.status(403).json({ message: 'Forbidden' });
      next();
    } catch {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};