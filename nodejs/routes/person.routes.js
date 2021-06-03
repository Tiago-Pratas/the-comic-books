import express from 'express';
const router = express.Router();
import * as Controller from '../controllers/person.controllers.js';

router.post('/save', Controller.savePersonPOST);

router.get('/find', Controller.findPersonGET);

export { router };
