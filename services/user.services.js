const UserModel = require('../model/user.model');
const WalletService = require('../services/wallet.services'); // เรียกใช้ WalletService
const jwt = require('jsonwebtoken');


class UserService {
    static async registerUser(name, email, phone, password, confpass) {
        try {
            // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                console.error("Email already in use");
                throw new Error("Email already in use");
            }

            // สร้างผู้ใช้ใหม่
            const createUser = new UserModel({ name, email, phone, password });
            const savedUser = await createUser.save();

            // สร้างกระเป๋าเงินให้กับผู้ใช้ใหม่
            await WalletService.createWallet(savedUser._id, 1000); // กำหนดยอดเงินเริ่มต้นเป็น 0.00

            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    static async checkuser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }


    static async getUserWithWallet(userId) {
        try {
            const user = await UserModel.findOne(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const wallet = await WalletService.getWalletByUserId(userId);
            return { user, wallet };
        } catch (error) {
            throw error;
        }
    }

    static async getAll() {
        try {
            const users = await UserModel.find({}, 'email');
    
            const walletPromises = users.map(async (user) => {
                try {
                    const wallet = await WalletService.getWalletByUserId(user._id);
                    return {
                        email: user.email,
                        wallet: wallet || {}
                    };
                } catch (err) {
                    console.error(`Failed to fetch wallet for user ${user.email}:`, err);
                    return {
                        email: user.email,
                        wallet: wallet || {} 
                    };
                }
            });
    
            const usersWithWallets = await Promise.all(walletPromises);
            return usersWithWallets;
        } catch (error) {
            console.error('Error fetching users and their wallets:', error);
            throw new Error('Failed to fetch users and wallets');
        }
    }

    static async getOne(userId) {
        try {
            // console.log('In service, received userId:', userId);
            // console.log('Type of userId:', typeof userId);
    
            const user = await UserModel.findOne({_id:userId});
            
            if (!user) {
                console.log('User not found for userId:', userId);
                return {
                    email: null,
                    wallet: {}
                };
            }
    
            console.log('User found:', user);
    
            try {
                const wallet = await WalletService.getWalletByUserId(user._id);
                console.log('Wallet fetched:', wallet);
                return {
                    email: user.email,
                    wallet: wallet || {}
                };
            } catch (err) {
                console.error(`Failed to fetch wallet for user ${user.email}:`, err);
                return {
                    email: user.email,
                    wallet: {}
                };
            }
    
        } catch (error) {
            console.error('Error fetching user and wallet:', error);
            throw error; 
        }
    }
    

    static async reset() {
        try {
            await UserModel.deleteMany({});
        } catch (error) {
            console.error('Error resetting users data:', error);
            throw error;
        }
    }
}

module.exports = UserService;
