import express from 'express';
import { getVolume, saveIssues, searchVolumes } from '../services/axios.js';
import { Volume } from '../db/models/volume.model.js';
import { Issue } from '../db/models/issue.model.js';
import { Collectible } from '../db/models/collectible.model.js';

const router = express.Router();

/**
 * GET /volumes/search
 * search for volumes with field and value
 */
router.post('/search/:result', async (req, res, next) => {
    try {
        const { field, fieldValue } = req.body;

        const { result } = req.params;

        const volumes = await searchVolumes(field, fieldValue, result);

        return res.status(200).json(volumes);
    } catch (e) {
        next(e);
    }
});

/**
 * GET volumes/deatil/:id
 * show a specific volume and cache the issues
 */
router.get('/detail/:id/:result', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { result } = req.params || 0;

        const volume = await getVolume(id);

        const persistedIssues = await Issue.find({
            'volume.name': volume.data.results.name,
        }).lean();

        if (!findIssues.length) {
            const issues = await saveIssues(id, result);

            await Promise.all(
                issues.data.results.map(async (issue) => {
                    const issues = await Issue.find({ apiRef: el.id });

                    if (issues == 0) {
                        const newIssue = new Issue({
                            apiRef: issue.id,
                            number: issue.issue_number,
                            image: issue.image.original_url,
                            release: issue.cover_date,
                            description: issue.description,
                            volume: issue.volume,
                        });

                        await newIssue.save();
                    }
                }),
            );
            return res.status(200).json(issues.data.results, volume.data.results, req.user);
        }

        return res.status(200).json(persistedIssues, volume, req.user);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

/**
 * GET collection/
 * get a list of issues in a collection
 */
router.get('/collection', async (req, res, next) => {
    try {
        const Collectibles = await Collectible.find({ ownerId: req.user._id });

        const Volumes = await Volume.find({
            ownerId: req.user._id,
            _id: Collectibles[0].hoard,
        });

        const Issues = await Promise.all(
            Volumes.map(async (volume) => {
                return await Promise.all(
                    volume.hoard.map(async (id) => {
                        const images = await Issue.findById(id).lean();
                        return images;
                    }),
                );
            }),
        );

        const flattenedIssues = Issues.flat();

        return res.status(200).json(flattenedIssues);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

/**
 *GET /volumes/wishlist
 *get a list of issues in a wishlist in a collection
 */
router.get('/wishlist', async (req, res, next) => {
    try {
        const Collectibles = await Collectible.find({ ownerId: req.user._id });

        if (!Collectibles.length) {
            return res.status(404)._destroy('No issues in your collection yet');
        }

        const Volumes = await Volume.find({
            ownerId: req.user._id,
            _id: Collectibles[0].hoard,
        });

        const Issues = await Promise.all(
            Volumes.map(async (volume) => {
                return await Promise.all(
                    volume.wishlist.map(async (id) => {
                        const issues = await Issue.findById(id).lean();
                        return issues;
                    }),
                );
            }),
        );

        const flattenedIssues = Issues.flat();

        return res.status(200).json(flattenedIssues);
    } catch (e) {
        next(e);
    }
});

export { router };
