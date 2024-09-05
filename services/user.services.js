const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(name, email, phone, password, confpass) {
        try {
            // Check if password and confpass match
            if (password !== confpass) {
                throw new Error("Password and confirmation password do not match");
            }

            const createUser = new UserModel({name, email, phone, password, confpass});
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }

    static async checkuser(email) {
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }
}
module.exports = UserService;