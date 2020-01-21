const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader || authHeader === '') {
        req.isAuth = false;
        return next();
    } 
    try {
        const decodedToken = jwt.verify(authHeader, 'supersecretkey');
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken;
    next();
};