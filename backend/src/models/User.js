import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:["user", "admin"], default: "user"},
    isEmailVerified: {type: Boolean, default: false},
    verificationToken: {type: String, default: null},
    passwordResetToken: { type: String, default: null},
    passwordResetExpires: { type: String, default: null},
},{timestamps: true});

export default mongoose.model("User", userSchema);