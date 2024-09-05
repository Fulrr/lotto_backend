const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require("./user.model");

const { Schema } = mongoose;

const walletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    Balance: {
        type: Number,
        required: true,
    }
});

const WalletModel = db.model('Wallet', walletSchema);

module.exports = WalletModel;