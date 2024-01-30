
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    console.log(token)
    jwt.verify(token, 'A!B@C#D$E%', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.log('15', decoded._id)
        req.userId = decoded._id;
        next();
    });
};

const verifyTokenBoolean = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'A!B@C#D$E%', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.userId = decoded._id;
        next();
    });
};

module.exports = { verifyToken, verifyTokenBoolean }