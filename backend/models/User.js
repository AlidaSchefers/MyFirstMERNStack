//user model and schema here. 
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, minlength: 5, maxlength: 256},
    password: {type: String, required: true, minlength: 6, maxlength: 100},
})
module.exports = mongoose.model("users", UserSchema)