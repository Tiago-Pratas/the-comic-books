import express from 'express';
const router = express.Router();
import * as Controller from '../controllers/storyArc.controllers.js';

router.post('/save', Controller.saveStoryArcPOST);

router.get('/find', Controller.findStoryArcGET);

export { router };
