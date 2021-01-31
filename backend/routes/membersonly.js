const router = require('express').Router()
const verify = require('../middlwares/verifyToken') //checks the jwt

//on t

//if you are signed in, you will get a message saying "hello, member. You're signed in."
//if you're not signed in, you will get "you are not signed in."

router.get('/', verify, async (res) => {
    try {
        res.send("Hello, member! You are signed in.")
    } catch (error) {
        res.send("You are not signed in.") //the front end does not know if this is error. needs the status code
    }
})

