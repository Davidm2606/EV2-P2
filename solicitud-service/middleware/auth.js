const jwt = require('jsonwebtoken');

const SECRET_KEY = 'f5VbsF31BN1Vfv2mt2S4VLcQEVaOuPxY';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Falta header Authorization' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Aquí tendrás el objeto con userId, role e iss
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};
