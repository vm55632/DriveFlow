const jwt = require('jsonwebtoken');

// Middleware for JWT verification
function verifyToken(req, res, next) {
    // Get token from headers
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.status(403).send('Token is required.');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid Token');
        }
        // Save the decoded token to the request for use in other routes
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
