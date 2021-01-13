const router = require('express').Router()
const sendErr = require('../middlwares/sendGenericError')
const User = require('../models/User.js') //the model
const {check, validationResult} = require('express-validator')

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
    console.log(errors)
    if(errors.length != 0) {
        return res.status(400).json({errors}) //return an array of all the errors (each error is an object)
    }
    try {
        const newUser = await User.create(req.body) //create method is combo of new User and .save() in one
        res.status(201).json(newUser)
    } catch (err) {
        sendErr(err, res) // this is an un-handled error.
    }
})

module.exports = router
