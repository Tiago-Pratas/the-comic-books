import express from 'express';
import passport from 'passport';

const router = express.Router();

/**
 * GET /register
 * render registration page
 */
 router.get('/register', (req, res, next) => {
    return res.render('register');
})

/**
 * POST /register
 * Regiter new users
 */
router.post('/register', (req, res, next) => {
    const { email, password } = req.body;

    //if any of the body fields is empty
    if(!email || !password) {
        const error = new Error('Invalid credentials');
        return res.render('login', { error: error.message })        
    }

    //call register strategy
    passport.authenticate('register', (error, user) => {
        if(error) {
            return res.render('login', { error: error.message });
        }

        return res.redirect('../jobs');
    })(req);
});

/**
 * GET //login
 * render login page
 */
router.get('/login', (req, res, next) => {
    return res.render('login', {user: req.user});
})

/**
 * POST /login
 * login registered users
 */
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('Invalid credentials');
        return res.render('login',{error: error.message});
    }

    passport.authenticate('login', (error, user) => {
        if(error) {
            return res.render('login',{error: error.message});
        }

        req.logIn(user, (error) => {
            if(error) {
                return res.send(error.message);
            }
            
            return res.redirect('../jobs');
        })
    })(req, res, next)
})

/**
 * POST /logout
 * allow users to logout
 */
router.get('/logout', (req, res, next) => {
    if(req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.render('main', { message: 'Logged out' });
        })
    }

    return res.render('login');

})

export { router }