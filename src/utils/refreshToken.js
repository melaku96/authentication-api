import userModel from "../model/userModel.js";
import { generateAccessToken, generateRefreshToken } from "./generateToken.js";

export const refreshToken = async(req, res)=>{
    try {
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(400).json({
                success: false,
                message: 'No token found!'
            })
        }
        const user = await userModel.findOne({refreshToken: token});
        if(!user){
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token!'
            })
        }
        //REFRESH TOKENS
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        //UPDATE USER
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken,{
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully!',
            newAccessToken: newAccessToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}