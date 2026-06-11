const jwt = require('jsonwebtoken');
const db = require('../database');

const authenticateToken = (req, res, next) => {
    // Check Authorization header first, then cookies
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ 
            error: 'Access denied. No token provided.',
            code: 'NO_TOKEN'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    error: 'Token expired. Please refresh.',
                    code: 'TOKEN_EXPIRED'
                });
            }
            return res.status(403).json({ 
                error: 'Invalid token.',
                code: 'INVALID_TOKEN'
            });
        }
        
        req.userId = decoded.userId;
        next();
    });
};

// Middleware to check if refresh token is revoked
const checkRevokedRefreshToken = async (token) => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM revoked_tokens WHERE token = ?',
            [token],
            (err, row) => {
                if (err) reject(err);
                resolve(!!row);
            }
        );
    });
};

module.exports = { authenticateToken, checkRevokedRefreshToken };