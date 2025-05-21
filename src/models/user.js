const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema);