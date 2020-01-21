const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName : {
        type: String, 
        required: true
    },
    password : {
        type: String,
        required: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }] 
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);