const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postTitle: {type: String, required: true, minlength: 3, maxlength: 250},
    post: {type: String, required: true, minlength: 1}
})

module.exports = postSchema.model('post', postSchema)