const config = require('../config');
const jwt = require('jsonwebtoken');

let authenticate = async(req, res, next) => {
    try {
        let token = req.header('Authorization');
        decoded = jwt.verify(token, config.secret);
        req.user = decoded.id;
        next();
    }
    catch (e) {
        res.status(401).send();
    }
}

module.exports = authenticate;