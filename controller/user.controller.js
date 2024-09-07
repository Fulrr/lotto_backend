const UserService = require("../services/user.services");


exports.register = async(req,res,next)=>{
    try {
        const {name, email, phone, password, confpass} = req.body;

        const successRes = await UserService.registerUser(name, email, phone, password, confpass);

        res.json({status:true,success:"User Registered Successfully"});
    } catch (error) {
        
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await UserService.checkuser(email);
        if (!user) {
            console.log("User does not exist");
            return res.status(404).json({ status: false, message: 'User does not exist' });
        }
        
        const isMatch = await user.comparePassword(password);
        if (isMatch === false) {
            console.log("Invalid password");
            return res.status(401).json({ status: false, message: 'Invalid password' });
        }
        
        let tokenData = { _id: user._id, email: user.email };
        const token = await UserService.generateToken(tokenData, "secretKey", '1h');
        
        res.status(200).json({ status: true, token: token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: false, message: 'An error occurred during login' });
    }
};
