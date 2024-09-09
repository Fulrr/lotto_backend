const mongoose = require('mongoose');
const db = require('../config/db');

const winningNumberSchema = new mongoose.Schema({
    DrawDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    LottoWin: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    required: true
});

const winningNumbers = db.model('winningNumber', winningNumberSchema);

module.exports = winningNumbers;