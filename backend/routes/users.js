const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendErr = require('../middlwares/sendGenericError')
const User = require('../models/User.js') //the model
const {check, validationResult} = require('express-validator')
const validator = require('validator')
const { findOne } = require('../models/User.js')

router.get('/all', async (req, res) => {
    try{
        // const key = 'email'
        // const allUsers = await User.find({[key]: 'user1'})
        const allUsers = await User.find() //find method always returns an array. if nothing is found, it will be an empty array
        res.json({allUsers}) //same as {allUsers: allUsers}
        //getting the users takes more than a millisecond. if we did not make syncronous, it would try to respond befor it got all the users.
            //this way with async-await, it tells it to wait until it gets all the users
        //always use try block when using MongoDB!!! be careful
    }catch(error){
        sendErr(error, res)
    }
})

// router.get('/byname/:user', async (req, res) => {
//     try{
//         const allUsers = await User.find({username: req.params.user})
//     }catch(err){
//         res.json({message: err})
//     }
// })

//async by default. 

router.post(
    '/signup', 
    check('email', "Email is required").not().isEmpty(),
    check('username', "Username is required").not().isEmpty(),
    check('password', "Password is required").not().isEmpty(),
    check('email', "Valid email required").isEmail(),
    check('password', "Password must be between 6 and 100 characters").isLength({min: 6, max: 100}),
    async (req, res) => {
    const errors = validationResult(req).array()
    // console.log(errors) //if the email is an email.
    if(errors.length != 0) {
        return res.status(400).json({errors}) //return an array of all the errors (each error is an object)
    }
    // const hashedPassword = await bcrypt.hash(req.body.password, 10) //10 is "saltRounds", or the complexity of string that will be created
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create(req.body) //create method is combo of new User and .save() in one
        //can make new object with the properties (e.g. email, username, password). 
        //extract just the values you want from the user. 
        res.status(201).json(newUser)
    } catch (err) {
        sendErr(err, res) // this is an un-handled error.
    }
})

//error occurs!
router.post('/login', async (req, res) => { //post put patch all send a body. 
    try {
        const DBUser =  validator.isEmail(req.body.identification) ? 
            User.find({"email": req.body.identification}) :
            User.find({"username": req.body.identification})
        console.log("test", DBUser)
        // if(bcrypt.compare(req.body.password, DBUser.password)) {
        //     const token = jwt.sign({"id": DBUser.__id}, process.env.SECRET_KEY)
        //     // const token = jwt.sign({"id": DBUser.__id, "static value": 3}, process.env.SECRET_KEY)
        //     res.json(token)
        // }
    }catch (error) {
        res.json({message: error.message || error})
    }
})

module.exports = router
