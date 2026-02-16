import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    await transporter.sendMail({
        from: '"Expense Tracker" <no-reply@expensetracker.com>',
        to,
        subject,
        html,
    });

    console.log(`email sent to ${to}`);
}