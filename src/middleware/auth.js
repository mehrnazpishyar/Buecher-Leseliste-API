import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Kein Token angegeben' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Ungültiger oder abgelaufener Token' });
  }
}

export default auth;