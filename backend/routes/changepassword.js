//get the _id and current password from the request
//if current password checks out, update with new password hash.
const router = require('express').Router()
const verify = require('../middlwares/verifyToken')
// const SendErr = require('../middlwares/sendGenericError')
const bcrypt = require('bcrypt')
const User = require('../models/User.js') //the model


router.put('/', verify, async (req,res,next) => { //in this, the user's password is sent to the router and then hashed then updated in DB.
    //put more try-catches or if-else so that the errors are more specific
    try {
        const DBUser = await User.findOne({_id: req.user._id})
        const currentDBHashedPassword = await DBUser.password
        if(await bcrypt.compare(req.body.password, currentDBHashedPassword)) { //if the current password is correct
            const newHashedPassword = await bcrypt.hash(req.body.newpassword, 10) //need newpassword property in the req body
            const updatedUser = await User.findOneAndUpdate({_id: req.body._id}, {password: newHashedPassword}, {useFindAndModify: false, new: true}) //BUG
                //this also returns the document. with the option ({new: true}), it returns the doc after the update
            if(await bcrypt.compare(req.body.newpassword, updatedUser.password)) {
                res.json({message: "Password successfully updated."})
            }else{
                res.json({message: "The password has not been updated."})
            }
            next()
        }
    } catch (error) {
        res.json({message: error.message || error})
    }
})

module.exports = router