import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import {z} from 'zod';
import crypto from 'crypto';
import { sendEmail } from '../utils/mailer.js';
import {OAuth2Client} from 'google-auth-library'

const registerSchema = z.object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]).optional()
})

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async(req, res)=>{
    try {
        const { idToken } = req.body;
        if(!idToken) return res.status(400).json({ message: "idToken required"});

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const {sub: googleId, email, email_verified, name} = payload;

        if(!email_verified){
            return res.status(400).json({message: "google account not verified"});
        }

        let user = await User.findOne({email});
        if(!user){
            const randomPassword = Math.random().toString(36).slice(-12);
            const hash = await bcrypt.hash(randomPassword, 10);

            user = await User.create({
                username: name || email.split("@")[0],
                email,
                password: hash,
                googleId,
                isEmailVerified: true,
            });
        }
        else{
            if(!user.googleId){
                user.googleId = googleId;
                user.isEmailVerified = true;
                await user.save();
            }
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.json({
            token,
            user: {id: user._id, username: user.username, email: user.email},
        });
        
    } catch (error) {
        console.error("error in googleLogin: ", error);
        console.log("error in login with google: ", error);
        res.status(500).json({ message: "google login failed" });
    }
}

export const register = async(req, res) =>{
    const parsed = registerSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({message: "invalid data"});

    const {username, email, password, role} = parsed.data;
    const exist = await User.findOne({ $or: [{username}, {email} ]});
    if(exist) return res.status(400).json({message: "user exists"})

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString("hex");

    const user = await User.create({username, email, password: hashedPassword, role, verificationToken: token});

    const verifyUrl = `http://localhost:3000/api/auth/verify/${token}`;
    await sendEmail(email, "Verify your Expense Tracker account",
     `<h2>Welcome to Expense Tracker 🎉</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}" 
         style="display:inline-block;padding:10px 20px;color:white;background:#4CAF50;text-decoration:none;border-radius:5px;">
         Verify Email
      </a>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p>${verifyUrl}</p>`
);

    return res.status(201).json({message: "user created", userId: user._id});
}

export const login = async(req, res)=>{
    const parsed = loginSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({message: "invalid data"});

    const {username, password} = parsed.data;
    const user = await User.findOne({username});
    if(!user) return res.status(400).json({message: "user does't exists"});

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(400).json({message: "invalid credentials"});

    if(!user.isEmailVerified) return res.status(403).json({message: "email is not verified"});

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "2h"});
    res.json({token});
}

export const verifyEmail = async(req, res)=>{
   try {
    const {token} = req.params;
    const user = await User.findOne({verificationToken: token});

    if(!user) return res.status(400).json({message: "invalid token or expired"});

    user.isEmailVerified = true,
    user.verificationToken = undefined
    await user.save();  

    res.json({message: "email verified"});
   } catch (error) {
        res.status(500).json({message: "server error"});
   }
}

export const requestResetPassword = async(req, res)=>{
    try {
        const { email } = req.body;
        if(!email) return res.status(400).json({ message: "email required"});

        const user = await User.findOne({email});
        if(!user) return res.json({ message: "if an account exist, a password reset link has been sent."});

        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.passwordResetToken = tokenHash;
        user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
        await user.save();

        const reserUrl =`${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

        await sendEmail(
            email,
            "Reset your Expense Tracker password",
            `<p>You requested a pasword reset. Click the below link to reset your password (vlaid for 1 hour only):</p>
            <p><a href="${reserUrl}">Reset Password</a></p>
            <p>If the link dosen't work, use the below code (or paste this link directly): </p>
            <p>${reserUrl}</p>`
        );

        console.log(`password reset token for ${email}: ${resetToken}`);
        return res.json({message: "if an account exist, a password reset link has been sent."})
    } catch (error) {
        console.log("error in request reset password:", error);
        return res.status(500).json({message: "error in requestResetPassword"})
    }
}

export const resetPassword = async(req, res)=>{
    try {
        const {email, token, newPassword} = req.body;
        if(!email || !token || !newPassword) return res.status(400).json({message: "email, token and newPassword required"});

        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            email,
            passwordResetToken : tokenHash,
            passwordResetExpires: { $gt : Date.now()}
        });

        if(!user) return res.status(400).json({message: "invalid or expired token"});

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return res.json({ message: "password reset successful"});
        
    } catch (error) {
        console.log("error in resetPassword: ", error);
        return res.status(500).json({ message: "error resetting password"});
    }
}