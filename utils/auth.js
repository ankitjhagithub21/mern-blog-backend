const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
    const payload = {
        id: user._id,
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
}

function verifyToken(token) {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return null; 
    }
}

module.exports = {
    generateToken,
    verifyToken
};
