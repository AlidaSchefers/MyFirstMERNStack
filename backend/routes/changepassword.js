//get the _id and current password from the request
//if current password checks out, update with new password hash.
const router = require('express').Router()
const verify = require('../middlwares/verifyToken')
const SendErr = require('../middlwares/sendGenericError')
const bcrypt = require('bcrypt')
const User = require('../models/User.js') //the model


router.put('/', verify, async (req,res,next) => { //in this, the user's password is sent to the router and then hashed then updated in DB.
    try {
        const DBUser = await User.findOne({_id: req.user._id})
        console.log("'initial' DBUser:")
        console.log(DBUser)
        // console.log(req.user._id)
        const currentDBHashedPassword = await DBUser.password
        // console.log(`currentDBHashedPassword: ${currentDBHashedPassword}`)
        // console.log(`sent password matches hashed: ${await bcrypt.compare(req.body.password, currentDBHashedPassword)}`)
        if(await bcrypt.compare(req.body.password, currentDBHashedPassword)) { //if the current password is correct
            const newHashedPassword = await bcrypt.hash(req.body.newpassword, 10) //need newpassword property in the req body
            // await User.findOneAndUpdate({_id: req.body._id}, {password: newHashedPassword}) //BUG
            await User.findOneAndUpdate({_id: req.body._id}, {password: newHashedPassword}, function(err,doc) {
                if (err) { throw err; }
                else { console.log("Updated"); } }) //BUG
            const newDBUser = await User.findOne({_id: req.user._id})
            console.log(`new password from request body: ${req.body.newpassword}`)
            console.log(`oldHashedPassword: ${currentDBHashedPassword}`)
            console.log(`newHashedPassword: ${newHashedPassword}`) //so new one is created fine. but does it go in the DB?
            console.log(`password from the database: ${await newDBUser.password}`) //still the old hashed password
            if(await bcrypt.compare(req.body.newpassword, newHashedPassword)) {
                res.send("Password successfully updated.")
            }else{
                res.send("The password has not been updated.")
            }
            // console.log(DBUser)
            next()
        }
    } catch (error) {
        res.json({message: error.message || error})
    }
})

module.exports = router