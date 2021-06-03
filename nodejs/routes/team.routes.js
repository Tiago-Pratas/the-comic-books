import express from 'express';
const router = express.Router();
import * as Controller from '../controllers/team.controllers.js';

router.post('/save', Controller.saveTeamPOST);

router.get('/find', Controller.findTeamGET);

export { router };
