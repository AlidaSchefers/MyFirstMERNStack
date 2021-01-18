const router = require('express').Router()
const verify = require('../middlwares/verifyToken')

router.get('/accountinfo', (req,res,next) => {
    // res.send(req.token)
    console.log(`token: ${req.token}`)
    next()
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