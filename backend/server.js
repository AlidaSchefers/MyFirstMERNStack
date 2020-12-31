const express = require('express')
const server = express() //new express.Express

require('dotenv').config() //make sure this line is before you try accessing any env vars.

server.use((req, res) => {
    res.send("Hello, World")
})

server.listen(3000, () => { //can update to make dynamic
    console.log("Listen on port 3000")
})