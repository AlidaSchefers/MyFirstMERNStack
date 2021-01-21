const router = require('express').Router()
const verify = require('../middlwares/verifyToken')
const sendErr = require('../middlwares/sendGenericError')
const User = require('../models/User.js')
// const jwt = require('jsonwebtoken')

router.get('/', verify, async (req,res,next) => {
    try {
        // const userId = await jwt.verify(req.body.token, process.env.SECRET_KEY)._id
        const userId = await req.user._id //from the verify function that checks the token
        const userInfo = await User.findOne({"_id": userId})
        // console.log(userInfo)
        res.send(userInfo)  
    } catch (error) {
        sendErr(error, res)
    }
})

module.exports = router