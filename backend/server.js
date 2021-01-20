const express = require('express')
const server = express() //new express.Express
const databaseConnect = require('./databaseConnect') //this variable is a function
const usersRouter = require('./routes/users')

require('dotenv').config() //make sure this line is before you try accessing any env vars.

databaseConnect() //running the function. connects us to the database and logs various messages
//this is being run at the root. all the routes can access too.

server.use('/greeting', (req, res, next) => {
    res.send("Hello, World")
    next()
})

server.use(express.json()) //allows us to read the request body when it is json format
server.use('/users', usersRouter)

const accountInfoRouter = require('./routes/accountinfo')
server.use('/accountinfo', accountInfoRouter)

server.listen(3000, () => { //can update to make dynamic
    console.log("Listen on port 3000")
})