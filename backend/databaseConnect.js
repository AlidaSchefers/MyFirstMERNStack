const mongoose = require('mongoose')
module.exports = () => {
    mongoose.connect(process.env.MONGO_URI, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true}) //changed the deprecating settings, which are the default
    //need a an open event listener, which means we have connected to the database
    //starts connection to MongoDB database. starts connection/communication and does  not stop being connected until we disconnect or smth
    
    //event listeners:
    mongoose.connection.on('open', () => { //finished its connection process
        console.log("Connected to database")
    })
    mongoose.connection.on("error", (err) => {
        console.log(`\nERROR: ${err}\n`);
    });
    mongoose.connection.on("connected", (err) => { //in the process of connecting
        console.log(`\nConnecting To Database\n`);
    });
    mongoose.connection.on("disconnected", (err) => {
        console.log(`\nThe Application has been disconnected from the database;\n`);
    });
}   