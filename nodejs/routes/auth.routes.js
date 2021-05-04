import express from 'express';
import passport from 'passport';
import { sendEmailToken } from '../services/nodemailer.js';
import { Token } from '../db/models/token.model.js';
import { User } from '../db/models/user.model.js';
import crypto from 'crypto';

const router = express.Router();

/**
 * GET /register
 * render registration page
 */
router.get('/register', (req, res, next) => {
    return res.render('register');
});

/**
 * POST /register
 * Regiter new users
 */
router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    //if any of the body fields is empty
    if (!email || !password) {
        const error = new Error('Invalid credentials');
        return res.render('login', { error: error.message });
    }

    //call register strategy
    passport.authenticate('register', (error, user, token) => {
        if (error) {
            return res.render('register', { error: error.message });
        }

        //send email with verification link
        sendEmailToken(email, token.verificationToken, req.protocol, req.get('host'));

        return res.redirect('/auth/login');
    })(req);
});

/**
 * GET auth/send/:email
 * render confimation email view and send email to user with confirmation link
 */
router.get('/verify/:email/:verificationToken', async (req, res, next) => {
    try {
        const { email, verificationToken } = req.params;

        const foundToken = await Token.findOne({ email, verificationToken });

        if (foundToken && foundToken.pwdReset == false) {
            console.log(foundToken.userId);

            const updateUser = await User.findByIdAndUpdate(
                foundToken.userId,
                { isVerified: true },
                { new: true },
            );

            return res.json(updateUser);
        }

        if (foundToken && foundToken.pwdReset == true) {
            await User.findByIdAndUpdate(
                foundToken.userId,
                { password: req.body.password },
                { new: true },
            );

            return res.json('updated password');
        }

        return res.status(401).json('not registered');
    } catch (e) {
        next(e);
    }
    //if any of the body fields is empty
    if (!email || !password) {
        const error = new Error('Invalid credentials');
        return res.render('login', { error: error.message });
    }

    //call register strategy
    passport.authenticate('register', (error, user) => {
        if (error) {
            return res.render('register', { error: error.message });
        }
        return res.redirect('/auth/login');
    })(req);
});


/**
 * POST /verify/resend
 * resend token email
 */
router.post('/verify/resend', async (req, res, next) => {
    try {
        const { email } = req.body;

        const findUser = await User.findOne({ email });

        if (!findUser.length) {
            const error = new Error('Please create an account');

            return res.status(401).json(error);
        }

        const findToken = await Token.findOne({ userId: findUser._id, email });

        if (!findToken.length) {
            const newToken = new Token({
                userId: findUser._id,
                email,
                verificationToken: crypto.randomBytes(25).toString('hex'),
            });

            const saveToken = await newToken.save();

            return await sendEmailToken(
                email,
                saveToken.verificationToken,
                req.protocol,
                req.get('host'),
            );
        }

        return await sendEmailToken(
            email,
            findToken.verificationToken,
            req.protocol,
            req.get('host'),
        );
    } catch (e) {
        next(e);
    }
});

/**
 * POST /auth/resetpass
 * send reset password permarlink
 */
router.post('/resetpass', async (req, res, next) => {
    try {
        const { email } = req.user;

        const findToken = await Token.find({ email });

        if (!findToken.length) {
            const newToken = new Token({
                userId: req.user._id,
                email,
                pwdReset: true,
                verificationToken: crypto.randomBytes(25).toString('hex'),
            });

            const saveToken = await newToken.save();

            await sendEmailToken(email, saveToken.verificationToken, req.protocol, req.get('host'));

            return res.status(200).json('email sent');
        }
        //find token
        //uodatetoe¡ken and mail it
    } catch (e) {}
});

/**
 * GET //login
 * render login page
 */
router.get('/login', (req, res, next) => {
    return res.render('login', { user: req.user });
});

/**
 * POST /login
 * login registered users
 */
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('Invalid credentials');
        return res.render('login', { error: error.message });
    }

    passport.authenticate('login', (error, user) => {
        if (error) {
            return res.render('login', { error: error.message });
        }

        req.logIn(user, (error) => {
            if (error) {
                return res.send(error.message);
            }

            return res.redirect('../volumes/search');
        });
    })(req, res, next);
});

/**
 * POST /logout
 * allow users to logout
 */
router.get('/logout', (req, res, next) => {
    if (req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.render('login', { message: 'Logged out' });
        });
    }

    return res.render('login');
});

export { router };
