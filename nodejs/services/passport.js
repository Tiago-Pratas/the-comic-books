import passport from 'passport';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../db/models/user.model.js';
import { Token } from '../db/models/token.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const salt = 10;

//serialise session for user
passport.serializeUser((user, done) => {
    return done(null, user._id);
});

//deserialise user
passport.deserializeUser(async (id, done) => {
    try {
        const existingUser = await User.findById(id);
        return done(null, existingUser);
    } catch (error) {
        return done(error);
    }
});

const registerStrategy = new LocalStrategy(customFields, async (req, email, password, done) => {
    try {
        const prevUser = await User.findOne({ email });

        //check if the email is unique
        if (prevUser) {
            const error = new Error('This email is already registered');
            return done(error);
        }

        //hash password
        const hash = await bcrypt.hash(password, salt);

        //generate random token to send via email for verifcation
        const verificationToken = crypto.randomBytes(20).toString('hex');

        //create new user
        const newUser = new User({
            email,
            'username': req.body.username,
            'password': hash,
            'verification.token': verificationToken,
        });

        //persist new registered user to the DB
        const saveUser = await newUser.save();

        //create verification token
        const newToken = new Token({
            userId: saveUser._id,
            email,
            verificationToken: crypto.randomBytes(25).toString('hex'),
        });

        const saveToken = await newToken.save();

        return done(null, saveUser, saveToken);
    } catch (error) {
        return done(error);
    }
});

const loginStrategy = new LocalStrategy(customFields, async (req, email, password, done) => {
    try {
        //lookup user
        const currentUser = await User.findOne({ email });

        //if user is not registered return exception
        if (!currentUser) {
            const error = new Error('Credentials are not valid');
            return done(error);
        }

        //if user hasn't verified their email address
        if (!currentUser.isActive) {
            const error = new Error('Please verify your email');
            return done(error);
        }

        //compare password and hash
        const isValidpwd = await bcrypt.compare(password, currentUser.password);

        //if passwords don't match return exception
        if (!isValidpwd) {
            const error = new Error('Credentials are not valid');
            return done(error);
        }

        //if both checks are passed log in user
        return done(null, currentUser);
    } catch (e) {
        return done(e);
    }
});

const GoogleLogin = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google-return',
},

async (accessToken, refreshToken, profile, cb) => {
    const currentUser = await User.findOne({ googleId: profile.id });
    if (currentUser) {
        //if we already have a record with the given profile ID
        return done(null, currentUser);
    } else {
        //if not, create a new user
        const newUser = new User({
            googleId: profile.id,
            username: profile.getUsername(),
            image: profile.getImageUrl(),
            email: profile.email,
            isActive: true,
        });

        const savedUser = await newUser.save();

        return done(null, savedUser);
    }
});


passport.use('register', registerStrategy);
passport.use('login', loginStrategy);
passport.use('google', GoogleLogin);
