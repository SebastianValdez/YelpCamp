const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserScehma = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserScehma.plugin(passportLocalMongoose) // ! Adds a username and password to the UserScehma model

module.exports = mongoose.model('User', UserScehma)