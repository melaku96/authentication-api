import bcrypt from "bcryptjs";
import {registerJoi} from '../utils/validation.js'
import userModel from "../../../../../###PROJECTS/NodeJs Files/Product_API/models/userModel.js";

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
