const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(name, email, phone, password, confpass) {
        try {
            // ตรวจสอบว่ารหัสผ่านและรหัสผ่านยืนยันตรงกัน
            if (password !== confpass) {
                console.error("Password and confirmation password do not match");
                throw new Error("Password and confirmation password do not match");
            }

            // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                console.error("Email already in use");
                throw new Error("Email already in use");
            }

            const createUser = new UserModel({name, email, phone, password});
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