import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: false, message: 'Unauthorized', data: {} });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    return handler(req, res);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: false, message: 'Unauthorized', data: {} });
  }
};

export default authMiddleware;
