import express from 'express';
import passport from 'passport';

const router = express.Router();

/**
 * GET /register
 * render registration page
 */
 // /auth/register
router.post('/register', (req, res, next) => {
    const { email, password } = req.body;

    console.log('Registrando usuario...', req.body);

    if(!email || !password) {
        const error = new Error('User and password are required');
        return res.json(error.message);
    }

    passport.authenticate('register', (error, user) => {

        if(error) {
            return res.json(error.message);
        }

        return res.json(user);
    })(req);
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    console.log('Logging user', req.body);

    if(!email || !password) {
        const error = new Error('Requires both user and password')
        return res.json(error.message);
    }

    passport.authenticate('login', (error, user) => {
        if(error) {
            return res.json(error.message);
        }

        req.logIn(user, (error) => {
            if(error) {
                return res.send(error.message);
            }

            return res.send(user);
        })
    })(req, res, next)
});

router.post('/logout', (req, res, next) => {
    console.log('req.user', req.user);
    if(req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.json('Logged out successfuly');
        })
    } else {
        return res.json('No user found');
    }
});


export { router }