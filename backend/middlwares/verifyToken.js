const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) { //verifies the token
    //get the token
    const token = req.body.token
    if(!token) return res.status(401).send('Access Denied')
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY) //this give us the payload (_id and iat)
        req.user = verified
        next()
    } catch (err) {
        res.send('Invalid Token')
    }
    //compare the token
    //allow or not.
}