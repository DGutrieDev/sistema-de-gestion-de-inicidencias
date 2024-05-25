const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Acceso Denegado: Token no encontrado' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Accesso Denegado: Fallo la autenticacion' });
        }
        req.user = decoded;
        console.log(req)
        next();
    });
}

module.exports = verifyToken;
