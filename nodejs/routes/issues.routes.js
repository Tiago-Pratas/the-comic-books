import express from 'express';
import * as Controllers from '../controllers/issues.controllers.js';

const router = express.Router();

/**
 * POST /issues/save
 */
router.post('/save', Controllers.saveIssuesPOST);

/**
 * GET issues/find
 * find issues in DB
 */
router.get('/find', Controllers.findIssuesGET);

/**
 * POST issues/colecction
 * save issue to users collection
 */
router.post('/save-collection', Controllers.saveToCollectionPOST);

/**
 * GET issues/get-collection
 * get issues from a specific user
 */
router.get('/get-collection', Controllers.findCollectionGET);

/**
 * PATCH issues/delete-collection
 * delete a single issue from a collection
 */
router.patch('/delete-collection', Controllers.deleteFromColectionPATCH);

export { router };
