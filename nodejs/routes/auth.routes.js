import express from 'express';
import * as controller from '../controllers/auth.controllers.js';

const router = express.Router();


router.post('/register', controller.registerPost);

router.post('/login', controller.loginPost);

router.post('/logout', controller.logoutPost);

router.post('/verify/resend', controller.resendToken);

router.post('/verify/:email/:verificationToken', controller.verifyToken);

router.get('/check-session', controller.checkSession);

router.get('/google', controller.googleLogin);

router.get('/google-return', controller.googleReturn);

export { router };
