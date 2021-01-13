//user model and schema here. 
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, minlength: 5, maxlength: 256},
    password: {type: String, required: true, minlength: 6, maxlength: 100},
})
module.exports = mongoose.model('user', UserSchema)
//btw the collection is named now 'users' b/c MongoDB adds the s to make it plural.
//schema is the blueprint/set of rules that define documents are structured. model is an object to access and modify the database or collection.