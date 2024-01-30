const jwt = require('jsonwebtoken');

const checkAuth = async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        return jwt.verify(token, 'A!B@C#D$E%', (err, decoded) => {
            if (err) {
                return ""
            }

            console.log('auth found id: ', decoded._id)
            return decoded._id;
        });
    } else {
        return ""
    }
}

module.exports = { checkAuth }