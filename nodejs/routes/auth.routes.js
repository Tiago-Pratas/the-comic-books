import express from 'express';
<<<<<<< Updated upstream
import passport from 'passport';
import { sendEmailToken } from '../services/nodemailer.js';
import { Token } from '../db/models/token.model.js';
import { User } from '../db/models/user.model.js';
import crypto from 'crypto';
const router = express.Router();

/**
 * POST /register
 * Regiter new users
 */
router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    //if any of the body fields is empty
    if (!email || !password) {
        const error = new Error('Invalid credentials');
        return res.status(401).json(error);
    }
=======
import * as controller from '../controllers/auth.controllers.js';

const router = express.Router();


router.post('/register', controller.registerPost);

router.post('/login', controller.loginPost);
>>>>>>> Stashed changes

router.post('/logout', controller.logoutPost);

router.post('/verify/resend', controller.resendToken);

<<<<<<< Updated upstream
        return res.status(200).json('new user created');
    })(req);
});
=======
router.post('/verify/:email/:verificationToken', controller.verifyToken);
>>>>>>> Stashed changes

router.get('/check-session', controller.checkSession);

<<<<<<< Updated upstream
        const foundToken = await Token.findOne({ email, verificationToken });

        if (foundToken && foundToken.pwdReset == false) {
            await User.findByIdAndUpdate(foundToken.userId, { isVerified: true }, { new: true });

            return res.status(200).json('user verified');
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

            await sendEmailToken(email, saveToken.verificationToken, req.protocol, req.get('host'));

            return res.status(200).json('sent email with new permalink');
        }

        await sendEmailToken(email, findToken.verificationToken, req.protocol, req.get('host'));

        return res.status(200).json('sent email with permalink');
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

        const findToken = await Token.findOneAndUpdate(
            { email },
            { pwdReset: true },
            { new: true },
        );

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

        await sendEmailToken(email, findToken.verificationToken, req.protocol, req.get('host'));

        return res.status(200).json('email sent');
    } catch (e) {
        next(e);
    }
});

/**
 * POST /login
 * login registered users
 */
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('Invalid credentials');
        return res.status(422).json(error);
    }

    passport.authenticate('login', (error, user) => {
        if (error) {
            return res.render('login', { error: error.message });
        }

        req.logIn(user, (error) => {
            if (error) {
                return res.send(error.message);
            }

            return res.status(200).json('user logged in');
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
            return res.clearCookie('connect.sid');
        });
    }

    return res.status(200).json('user logged out');
});
=======
>>>>>>> Stashed changes

export { router };
