import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function sendEmailToken(userEmail, verificationToken, protocol, host) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
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
        html: encodeURI(`${protocol}://${host}/auth/verify/${userEmail}/${verificationToken}`),
    });

    return info;
}

export { sendEmailToken };
