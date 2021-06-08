import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmailToken = async (userEmail, verificationToken, host) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ACC,
            pass: process.env.EMAIL_PWD,
        },
    });

    const info = await transporter.sendMail({
        from: '"the Comic Books" <no-reply@the-comic-books.com>',
        to: `${userEmail}`,
        subject: 'email confirmation',
        text: 'Email verification from the comic books',
        html: encodeURI(`${host}/auth/verify/${userEmail}/${verificationToken}`),
    });

    return info;
};

export { sendEmailToken };
