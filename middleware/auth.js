var jwt = require('jsonwebtoken')
const fs = require('fs'); 
const path = require('path')
const publicKey = fs.readFileSync(path.join(__dirname, '../key/public-key.pem'), 'utf8');

function checkAuth(req, res, next){
    try {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
        })
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json('token k hop le')
    }
}

module.exports = {
    checkAuth
}