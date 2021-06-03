import express from 'express';
const router = express.Router();
import * as Controller from '../controllers/characters.controllers.js';

router.post('/save', Controller.saveCharacterPOST);

router.get('/find', Controller.findCharacterGET);

export { router };
