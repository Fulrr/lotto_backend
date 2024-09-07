const lottoService = require('../services/winningNumbers.services');

exports.randomWinning = async (req, res, next) => {
    try {
        const result = await lottoService.randomWinning();
        if (!result) {
            return res.status(404).json({
                message: 'No lotto number found.'
            });
        }

        res.status(201).json({
            message: 'Winning record added successfully.',
            data: result
        });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({
            message: 'Error processing random winning number.',
            error: error.message
        });
    }
};

exports.resetWinningNumbers = async (req, res, next) => {
    try {
        await lottoService.resetWin();
        res.status(200).json({
            message: 'Winning numbers have been reset successfully.'
        });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({
            message: 'Error resetting winning numbers.',
            error: error.message
        });
    }
};