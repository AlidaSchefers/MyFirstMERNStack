const express = require('express')
const server = express() //new express.Express
const databaseConnect = require('./databaseConnect') //this variable is a function

require('dotenv').config() //make sure this line is before you try accessing any env vars.

databaseConnect() //running the function. connects us to the database and logs various messages

server.use((req, res) => {
    res.send("Hello, World")
})

server.listen(3000, () => { //can update to make dynamic
    console.log("Listen on port 3000")
})