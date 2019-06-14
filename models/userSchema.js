const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        data: Buffer,
        contentType: String
    }
})

module.exports = model('User', userSchema);