import passport from 'passport';
import crypto from 'crypto';
import { sendEmailToken } from '../services/nodemailer.js';
import { Token, User } from '../db/index.js';


/**
 * POST suth/register
 * register user and send email verification token
 */
const registerPost = (req, res, next) => {
    const { email, password, username } = req.body;
    console.log('Registering user...');
    if (!email || !password || !username) {
        const error = new Error('User, email and password are required');
        return next(error);
    }
    passport.authenticate('register', (error, token) => {
        if (error) {
            return next(error);
        }
        //send email with verification link
        sendEmailToken(email, token.verificationToken, req.get('origin'));

        return res.json('User has been registered, please check your email');
    })(req, res, next);
};

//auth/login
const loginPost = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('Email and password are required');
        return res.json(error.message);
    }
    passport.authenticate('login', (error, user) => {
        if (error) {
            return res.json(error.message);
        }

        req.login(user, (error) => {
            if (error) {
                return res.send(error.message);
            }
            const userLogged = user;
            userLogged.password = null;
            return res.send(userLogged);
        });

        /*return res.json(user); */
    })(req, res, next);
};

//auth/logout
const logoutPost = (req, res) => {
    if (req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.json('Logout user');
        });
    } else {
        return res.json('No user found');
    }
};

//auth/check-session
const checkSession = async (req, res) => {
    if (req.session) {
        return res.json(req.user);
    } else {
        const error = new Error('Unexpected error');
        return res.status(401).json(error.message);
    }
};

/*POST /verify/resend
*resend token email
*/
const resendToken = async (req, res, next) => {
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

            await sendEmailToken(email, saveToken.verificationToken, req.get('origin'));

            return res.status(200).json('We ahev sent you a link with a confirmation link');
        }

        return await sendEmailToken(email, findToken.verificationToken, req.get('origin'));
    } catch (e) {
        next(e);
    }
};


/**
 * GET verify/:email/:verificationToken
 * verify if token corresponds to email
 */
const verifyToken = async (req, res, next) => {
    try {
        const { email, verificationToken } = req.params;

        const foundToken = await Token.findOne({ email, verificationToken });

        //confirm email by changing the isActive field to true
        if (foundToken && !foundToken.pwdReset) {
            const updatedUser = await User.findByIdAndUpdate(
                foundToken.userId,
                { isActive: true },
                { new: true },
            );

            updatedUser.password = null;

            return res.status(200).json(updatedUser);
        }
        if (foundToken && foundToken.pwdReset) {
            await User.findOneAndUpdate(
                foundToken.userId,
                { password: req.body.password },
                { new: true },
            );

            return res.json('Your password has been updated');
        }
    } catch (err) {
        next(err);
    }
};

/**
 * POST auth/resetpwd
 * reset pwd on user model
 */
const resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const updateUser = await User.findOneAndUpdate({ email },
            { pwdReset: true },
            { new: true });

        if (!updateUser) return res.json('Make sure your address is correct');

        const newToken = new Token({
            userId: req.body.id,
            email,
            verificationToken: crypto.randomBytes(25).toString('hex'),
        });

        const saveToken = await newToken.save();

        await sendEmailToken(email, saveToken.verificationToken, req.get('origin'));

        return res.json('We have sent a reset link to your address');
    } catch (err) {
        next(err);
    }
};

//GET auth/google
const googleLogin = (req, res, next) => {
    try {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    } catch (error) {
        next(error);
    }
};

//GET auth/google-return
const googleReturn = (req, res, next) => {
    try {
        passport.authenticate('google', (error, user) => {
            if (error) {
                res.json(error.message);
                return;
            }
            req.login(user, (error) => {
                if (error) {
                    res.send(error.message);
                    return;
                }
                const userLogged = user;
                userLogged.password = null;
                res.status(302).redirect(`${process.env.CLIENT_URL}`);
            });
        })(req, res);
    } catch (error) {
        next(error);
    }
};

const twitterLogin = (req, res, next) => {
    try {
        passport.authenticate('twitter', { scope: ['profile', 'email'] })(req, res, next);
    } catch (error) {
        next(error);
    }
};

const twitterReturn = (req, res, next) => {
    try {
        passport.authenticate('twitter', (error, user) => {
            if (error) {
                res.json(error.message);
                return;
            }
            req.login(user, (error) => {
                if (error) {
                    res.send(error.message);
                    return;
                }
                const userLogged = user;
                userLogged.password = null;
                res.status(302).redirect(`${process.env.CLIENT_URL}`);
            });
        })(req, res);
    } catch (error) {
        next(error);
    }
};


export {
    registerPost,
    loginPost,
    logoutPost,
    checkSession,
    resendToken,
    verifyToken,
    resetPassword,
    googleLogin,
    googleReturn,
    twitterLogin,
    twitterReturn,
};
