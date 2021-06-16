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
router.get('/find/:apiRef', Controllers.findIssuesGET);

/**
 * POST issues/colecction
 * save issue to users collection
 */
router.post('/save-collection', Controllers.saveToCollectionPOST);

/**
 * GET issues/get-collection
 * get issues from a specific user
 */
router.get('/get-collection/:id', Controllers.findCollectionGET);

/**
 * PATCH issues/delete-collection
 * delete a single issue from a collection
 */
router.patch('/delete-collection', Controllers.deleteFromColectionPATCH);

/**
 * POST issues/save-wishlist
 * save issue to users wishlist
 */
router.post('/save-wishlist', Controllers.saveToWishlistPOST);

/**
 * POST issues/save-wishlist
 * save issue to users wishlist
 */
router.get('/get-wishlist/:id', Controllers.findWishlistGET);

export { router };
