import express from 'express';
import * as Controller from '../controllers/volume.controllers.js';
const router = express.Router();

/**
 * POST volumes/save
 * save a specif volume to the DB
 */
router.post('/save', Controller.saveVolumePOST);

router.get('/find', Controller.findVolumeGET);

export { router };
