import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.model.js';

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
    } catch(error) {
        return done(error);
    }

});

const registerStrategy = new LocalStrategy(customFields, async (req, email, password, done) => {

    try {
        const prevUser = await User.findOne({ email });
        
        //check if the email is unique
        if(prevUser) {
            const error = new Error('Credentials are not valid');
            return done(error);
        }

        //hash password
        const hash = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            email,
            password: hash,
        })

        //persist new registered user to the DB
        const saveUser = await newUser.save();

        return done(null, saveUser);
}
    catch (error) {
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

        //compare password and hash
        const isValidpwd = await bcrypt.compare(password, currentUser.password);

        //if passwords don't match return exception
        if (!isValidpwd) {
            const error = new Error('Credentials are not valid');
            return done(error);
        }

        //if both checks are passed log in user
        return done(null, currentUser);

    }
    catch (e) {
        return done(e)
    }

})

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);
