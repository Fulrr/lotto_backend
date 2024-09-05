
const WalletService = require('../services/wallet.services');

exports.createWallet = async (req, res, next) => {
    try {
        const {userId, Balance} = req.body;
        
        let wallet = await WalletService.createWallet(userId, Balance);

        res.json({status:true, success:wallet});
    } catch (error) {
        next(error);
    }
};

