import userModel from '../model/userModel.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs';

//FORGOT
export const forgotPassword = async(req, res)=>{
    try {
        const {email} = req.body;
        //check existance of user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'No user of this email found'
            })
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        //hash token
        const hashedResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
        //update user 
        user.resetPasswordToken = hashedResetToken;
        user.resetPasswordTokenExpire = Date.now() + 10*60*1000;
        await user.save();

        const resetURL = `http://localhost:3000/api/auth/reset-password/${hashedResetToken}`;

        res.status(200).json({
            success: true,
            resetURL: resetURL
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//RESET PASSWORD
export const resetPassword = async(req, res)=>{
    try {
        const {token} = req.params;
        const {newPassword} = req.body;
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpire: {$gt:Date.now()}
        });
        if(!user){
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            })
        }
        //hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        // update user
        user.password = hashedNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'password reseted successfully!'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
}