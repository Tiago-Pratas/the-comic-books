import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    return res.render('landing');
});

export { router };
