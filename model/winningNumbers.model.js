const mongoose = require('mongoose');
const db = require('../config/db');

const winningNumberSchema = new mongoose.Schema({
    DrawDate: {
        type: Date,
        default: Date.now
    },
    LottoWin: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const winningNumbers = db.model('winningNumber', winningNumberSchema);

module.exports = winningNumbers;