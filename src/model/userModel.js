import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email:{type: String, unique: true },
    password: String,
    profileImg: String,
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
},{timestamps: true});