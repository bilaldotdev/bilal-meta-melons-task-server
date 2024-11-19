const authMiddleWare = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Request unauthenticated!' });
  }

  next();
};

export default authMiddleWare;
