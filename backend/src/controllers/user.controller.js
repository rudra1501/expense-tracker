import User from "../models/User.js";
import bcrypt from "bcrypt";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

export const getProfile = async(req, res)=>{
    try {
        const userId = req.user?.id || req.user?._id;
        if(!userId) return res.status(401).json({message: "Not authenticated"});

        const user = await User.findById(userId).select(
            "-password -otp -otpExpiry -verificationToken -passwordResetToken -passwordResetExpires -__v"
        )
        if(!user) return res.status(404).json({message: "User not found"});

       
        res.json({user});

    } catch (error) {
        console.error("getProfile error: ", error);
        res.status(500).json({message: "server error fetching profile"});
    }
}

export const updateProfile = async(req, res)=>{
    try {
        const {username, email, currentPassword, newPassword} = req.body;
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message: "user not found"});

        let updated = false;

        if(!username || username.trim().length < 2) return res.status(400).json({message: "username must be 2 characters"})
        if(username === user.username) return res.status(400).json({message: "new username must be different from the current one"})
        
        user.username =username;
        updated = true;

        if(email && email !== user.email){
            if(!email.includes("@")){
            return res.status(400).json({message: "valid email required"});
            }
            const exists = await User.findOne({ email });
            if(exists && exists._id.toString() !== req.user.id){
            return res.status(400).json({message: "email already in use"});
            }

        user.email = email;
        user.isEmailVerified = false;
        updated = true;
        }
        
        if(newPassword){
            if(newPassword.length < 6){
                return res.status(400).json({ message: "password must be atleast 6 characters"});
            }
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch) return res.status(400).json({message: "current password is incorrect"});

            const hash = await bcrypt.hash(newPassword, 10);
            user.password = hash;
            updated = true;
        }

        if(!updated) return res.status(400).json({ message: "no changes detected"});
        await user.save();

        res.json({
            message: "Profile updated",
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
        
    } catch (error) {
        console.error("error in updateProfile", error);
        res.status(500).json({message: "server error"});
    }
}

export const deleteProfile = async(req, res)=>{
    try {
        const userId = req.user.id;
        
        await Expense.deleteMany({ userId });
        await Income.deleteMany({ userId });

        await User.findByIdAndDelete(userId);

        res.json({message: "Account and all related data has been deleted"});
    } catch (error) {
        console.log("error in deleting account", error);
        return res.status(500).json({ message: "server error deleting account"});
    }
}