const WalletModel = require("../model/wallet.model");

class WalletService{
    static async createWallet (userId, Balance){
        const createWallet = new WalletModel({userId, Balance});
        return await createWallet.save();
       
    }
}

module.exports = WalletService;