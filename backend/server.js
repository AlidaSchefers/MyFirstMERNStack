const express = require('express')
const server = express() //new express.Express
const databaseConnect = require('./databaseConnect') //this variable is a function
const usersRouter = require('./routes/users')
const CORs = require('cors')

require('dotenv').config() //make sure this line is before you try accessing any env vars.

databaseConnect() //running the function. connects us to the database and logs various messages
//this is being run at the root. all the routes can access too.

server.use(CORs()) //cross origin requests: CORs

server.use('/greeting', (req, res, next) => {
    res.send("Hello, World")
    next()
})

server.use(express.json()) //allows us to read the request body when it is json format
server.use('/users', usersRouter)

server.listen(4000, () => { //need to change this from 3000 b/c frontend uses 3000 and they frontend and backend should not have same port num
    console.log("Listen on port 4000")
})