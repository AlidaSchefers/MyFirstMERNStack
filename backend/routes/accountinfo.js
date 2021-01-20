const router = require('express').Router()
const verify = require('../middlwares/verifyToken')
const sendErr = require('../middlwares/sendGenericError')

router.post('/accountinfo', async (req,res,next) => {
    try {
        const token = await req.token
        console.log(`token: ${token}`)
        res.json(token)
        next()    
    } catch (error) {
        sendErr(err, res)
    }
})


// router.get('/accountinfo', verify, (req,res,next) => {
//     //display account info here. when get the info from the database
//     // const auth_token = req.body.auth_token
//     console.log("we've got through!")
//     //const {auth_token} = req.body //this works too, right?
// })
//need to have the token match
//then need to display info from the database

module.exports = router