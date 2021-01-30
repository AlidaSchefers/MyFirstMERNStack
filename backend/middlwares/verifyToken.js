const jwt = require('jsonwebtoken')

//this just verifies that the token had not been modified since it was created. 
module.exports = function(req, res, next) { //verifies the token
    //get the token
    const token = req.headers['auth-token']
    if(!token) return res.status(401).send('Access Denied')
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY) //this give us the payload (_id and iat)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
    //compare the token
    //allow or not.
}