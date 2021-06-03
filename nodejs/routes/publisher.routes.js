import express from 'express';
const router = express.Router();
import * as Controller from '../controllers/publisher.controllers.js';

router.post('/save', Controller.savePublisherPOST);

router.get('/find', Controller.findPublisherGET);

export { router };
