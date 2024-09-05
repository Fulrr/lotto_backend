const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confpass: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function () {
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));

        const hashpass = await bcrypt.hash(user.password,salt);
        user.password = hashpass;

        const hashconfpass = await bcrypt.hash(user.confpass, salt);
        user.confpass = hashconfpass;
        
    }  catch (error) {
        next(error); 
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error; 
    }
};

const UserModel = db.model('User', userSchema);

module.exports = UserModel; 