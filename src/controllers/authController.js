import bcrypt from "bcryptjs";
import {registerJoi} from '../utils/validation.js'
import userModel from "../model/userModel.js";
import cookieParser from "cookie-parser";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

//SIGN UP
export const registerUser = async(req, res)=>{
    try {
       const {error} = registerJoi.validate(req.body, {abortEarly: false});
       if(error){
        const messages = error.details.map(err => err.message);
         return res.status(400).json({message: messages});
       }
       //check existance
       const {name, email, password} = req.body;
       const userExist = await userModel.findOne({email});
       if(userExist){
        return res.status(409).json({
            success: false,
            message: 'User already exists'
        });
       }
       //hash password
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = await userModel.create({
        name,
        email,
        password: hashedPassword
       });
       res.status(203).json({
        success: true,
        message: 'User registered successfully',
        user
       })  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// LOGIN
export const loginUsr = async(req, res)=>{
    try {
        const {email, password} = req.body;
        //check existance
        const user = await userModel.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({
                success: false,
                message: 'Invalid credential'
            });
        };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // hash refreshToken
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        //update user
        user.refreshToken = hashedRefreshToken;
        await user.save();

        res.cookie('refreshToken', hashedRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        res.status(200).json({
            success: true,
            message: 'Login Successfully!',
            accessToken:accessToken
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}