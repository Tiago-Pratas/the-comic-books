import express from 'express';
import axios from 'axios';
import { Issue } from '../db/models/issue.model.js';
import { Volume } from '../db/models/volume.model.js';
import { Collectible } from '../db/models/collectible.model.js';
import { Price } from '../db/models/price.model.js';

const router = express.Router();

router.get('/search', (req, res) => {
    return res.render('search');
});

/**
 * GET issues/search
 * get a list of all the issues limited to 100 per call
 */
router.post('/search', async (req, res, next) => {
    try {
        const field = req.body.field;

        const fieldValue = req.body.fieldValue;

        const response = await axios.get('https://comicvine.gamespot.com/api/issues', {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
                filter: `${field}:${fieldValue}`,
            },
        });

        return res.render('issueSearch', { response: response.data.results });
    } catch (e) {
        next(e);
    }
});

/**
 * GET issues/detal/:id
 * get a detailed view of a specific issue
 */
router.get('/detail/:apiRef', async (req, res, next) => {
    try {
        const { apiRef } = req.params;

        const findIssue = await Issue.find({
            apiRef,
            credits: { $not: { $size: 0 } },
        }).lean();

        if (!findIssue.length) {
            const getIssues = await axios.get(
                `https://comicvine.gamespot.com/api/issue/4000-${apiRef}/`,
                {
                    params: {
                        api_key: process.env.API_KEY,
                        format: 'json',
                    },
                }
            );

            const updateIssue = await Issue.findOneAndUpdate(
                { apiRef },
                { credits: [...getIssues.data.results.person_credits] },
                { new: true }
            );

            return res.render('issueDetail', { response: updateIssue.toJSON() });
        }

        return res.render('issueDetail', { response: findIssue });
    } catch (e) {
        next(e);
    }
});

/**
 * POST issues/detail/:id
 *
 * add Issue to collection
 */
router.get('/wishlist/add/:apiRef', async (req, res, next) => {
    //TODO: refactor this and check the logic
    try {
        const ownerId = req.user._id;

        const { apiRef } = req.params;

        const findIssue = await Issue.find({ apiRef });

        const findVolume = await Volume.find({
            ownerId,
            name: findIssue[0].volume.name,
        });

        const findCollectible = await Collectible.find({ ownerId });

        console.log('here', findCollectible);

        //if no Volumes are found create a new one
        if (findVolume.length == 0) {
            const newVolume = new Volume({
                ownerId,
                name: findIssue[0].volume.name,
                wishlist: [...findIssue],
            });

            const savedVolume = await newVolume.save();

            if (findCollectible.length == 0) {
                const newCollectible = new Collectible({
                    ownerId,
                });

                await newCollectible.hoard.push(savedVolume);

                await newCollectible.save();

                return res.redirect('/../volumes/wishlist');
            } else {
                await findCollectible[0].hoard.push(savedVolume);
                await findCollectible[0].save();
            }

            return res.redirect('/../volumes/wishlist');
        } else {
            await findVolume[0].wishlist.addToSet(findIssue[0]._id);
            await findVolume[0].save();

            if (findCollectible.length == 0) {
                const newCollectible = new Collectible({
                    ownerId,
                });

                await newCollectible.hoard.push(findVolume._id);

                await newCollectible.save();

                return res.redirect('/../volumes/wishlist');
            } else {
                await findCollectible[0].hoard.addToSet(findVolume._id);
                await findCollectible[0].save();
            }

            return res.redirect('/../volumes/wishlist');
        }
    } catch (e) {
        next(e);
    }
});

router.get('/collection/add/:apiRef', async (req, res, next) => {
    //TODO: refactor this and check the logic
    try {
        const ownerId = req.user._id;

        const { apiRef } = req.params;

        const findIssue = await Issue.find({ apiRef });

        const findVolume = await Volume.find({
            ownerId,
            name: findIssue[0].volume.name,
        });

        const findCollectible = await Collectible.find({ ownerId });

        //if no Volumes are found create a new one
        if (findVolume.length == 0) {
            const newVolume = new Volume({
                ownerId,
                name: findIssue[0].volume.name,
                hoard: [...findIssue],
            });

            const savedVolume = await newVolume.save();

            if (findCollectible.length == 0) {
                const newCollectible = new Collectible({
                    ownerId,
                });

                await newCollectible.hoard.push(savedVolume);

                await newCollectible.save();

                return res.redirect('../volumes/collection');
            } else {
                await findCollectible[0].hoard.push(savedVolume);
                await findCollectible[0].save();
            }

            return res.redirect('/../../volumes/collection');
        } else {
            await findVolume[0].hoard.addToSet(findIssue[0]._id);
            await findVolume[0].save();

            if (findCollectible.length == 0) {
                const newCollectible = new Collectible({
                    ownerId,
                });

                await newCollectible.hoard.push(findVolume._id);

                await newCollectible.save();

                return res.redirect('../../../volumes/collection');
            } else {
                await findCollectible[0].hoard.addToSet(findVolume._id);
                await findCollectible[0].save();
            }

            return res.redirect('../../../volumes/collection');
        }
    } catch (e) {
        next(e);
    }
});

/**
 * DELETE issues/wishlist/:id
 *
 * delete a specific issue from a volume
 */
router.delete('/wishlist/delete/:_id', async (req, res, next) => {
    try {
        const { ownerId } = req.user._id;

        const { _id } = req.params;

        const findIssue = await Issue.findById({ _id });

        const findVolume = await Volume.find({ name: findIssue.volume.name });

        console.log('Volume ->', findVolume);

        const deleteIssue = await Volume.findOneAndUpdate(
            {
                ownerId,
                name: findIssue.volume.name,
            },
            {
                $pull: {
                    wishlist: _id,
                },
            },
            { new: true }
        );

        console.log(deleteIssue);
        return res.redirect('../issues/wishlist');
    } catch (e) {
        next(e);
    }
});

router.delete('/collection/delete/:_id', async (req, res, next) => {
    try {
        const { ownerId } = req.user._id;

        const { _id } = req.params;

        const findIssue = await Issue.findById({ _id });

        const deleteIssue = await Volume.findOneAndUpdate(
            {
                ownerId,
                name: findIssue.volume.name,
            },
            {
                $pull: {
                    hoard: _id,
                },
            },
            { new: true }
        );

        return res.redirect('../issues/collection', { deleted: deleteIssue });
    } catch (e) {
        next(e);
    }
});

router.get('/sell/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;

        const editIssue = await Issue.findById({ _id }).lean();
        return res.render('editIssue', { issue: editIssue });
    } catch (e) {
        next(e);
    }
});

/**
 * PUT /issues/sell/:_id
 *
 * edit the specid details of an issue
 */
router.put('/sell/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;

        const { tradeoff, buy, sell, condition, forSale, forTrade } = req.body;

        const { ownerId } = req.user._id;

        const findPrice = await Price.find({ ownerId, issue: _id });

        if (findPrice.length == 0) {
            const newPrice = new Price({
                ownerId,
                tradeoff,
                buy,
                sell,
                condition,
                forSale,
                forTrade,
                issue: _id,
            });

            const savedPrice = await newPrice.save();
            await Issue.findByIdAndUpdate({ _id }, { avgPrice: savedPrice._id }, { new: true });

            return res.redirect('/market');
        }

        await Price.findOneAndUpdate(
            { ownerId, issue: _id },
            {
                ownerId,
                tradeoff,
                buy,
                sell,
                condition,
                forSale,
                forTrade,
                issue: _id,
            },
            { new: true }
        );

        await Issue.findByIdAndUpdate(
            { _id },
            { $set: { avgPrice: findPrice._id } },
            { new: true }
        );

        return res.redirect('/market');
    } catch (e) {
        next(e);
    }
});

export { router };
