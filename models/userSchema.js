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
    avatar_id: {
        type: String,
        required: true
    }
})

module.exports = model('User', userSchema);