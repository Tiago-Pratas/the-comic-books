import express from 'express';
import axios from 'axios';
import { Volume } from '../db/models/volume.model.js';
import { Issue } from '../db/models/issue.model.js';
import { Collectible } from '../db/models/collectible.model.js';

const router = express.Router();

router.get('/search', (req, res, next) => {
    return res.render('volumeSearch');
});
/**
 * GET /volumes/search
 * search for volumes with field and value
 */
router.post('/search', async (req, res, next) => {
    try {
        const field = req.body.field;

        const fieldValue = req.body.fieldValue;

        const response = await axios.get('https://comicvine.gamespot.com/api/volumes', {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
                filter: `${field}:${fieldValue}`,
            },
        });

        console.log(response.data.results);
        return res.render('volumeSearch', { response: response.data.results });
    } catch (e) {
        next(e);
    }
});

/**
 * GET volumes/deatil/:id
 * show a specific volume and cache the issues
 */
router.get('/detail/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://comicvine.gamespot.com/api/volume/4050-${id}`, {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
            },
        });

        const findIssues = await Issue.find({
            'volume.name': response.data.results.name,
        }).lean();

        console.log(findIssues);

        if (!findIssues.length) {
            const images = await axios.get('https://comicvine.gamespot.com/api/issues/', {
                params: {
                    api_key: process.env.API_KEY,
                    format: 'json',
                    filter: `volume:${id}`,
                },
            });

            await Promise.all(
                images.data.results.map(async (el) => {
                    const issues = await Issue.find({ apiRef: el.id });

                    console.log(issues.apiRef);

                    if (issues == 0) {
                        const newIssue = new Issue({
                            apiRef: el.id,
                            number: el.issue_number,
                            image: el.image.original_url,
                            release: el.cover_date,
                            description: el.description,
                            volume: el.volume,
                        });

                        await newIssue.save();
                    }
                }),
            );
            return res.render('volumeDetail', {
                response: response.data.results,
                images: images.data.results,
                user: req.user.toJSON(),
            });
        }

        return res.render('volumeDetail', {
            response: response.data.results,
            issue: findIssues,
            user: req.user.toJSON(),
        });
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
        const findCollectibles = await Collectible.find({ ownerId: req.user._id });

        if (!findCollectibles.length) {
            return res.render('collection');
        }

        const findVolume = await Volume.find({
            ownerId: req.user._id,
            _id: findCollectibles[0].hoard,
        });

        const findIssues = await Promise.all(
            findVolume.map(async (el) => {
                return await Promise.all(
                    el.hoard.map(async (image) => {
                        const images = await Issue.findById(image).lean();
                        return images;
                    }),
                );
            }),
        );

        const flattenedIssues = findIssues.flat();

        return res.render('collection', {
            issue: flattenedIssues,
            user: req.user.toJSON(),
        });
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
        const findCollectibles = await Collectible.find({ ownerId: req.user._id });

        if (!findCollectibles.length) {
            return res.render('collection');
        }

        const findVolume = await Volume.find({
            ownerId: req.user._id,
            _id: findCollectibles[0].hoard,
        });

        const findIssues = await Promise.all(
            findVolume.map(async (el) => {
                return await Promise.all(
                    el.wishlist.map(async (image) => {
                        const images = await Issue.findById(image).lean();
                        console.log('images', images);
                        return images;
                    }),
                );
            }),
        );

        const flattenedIssues = findIssues.flat();

        return res.render('collection', {
            issue: flattenedIssues,
            user: req.user.toJSON(),
        });
    } catch (e) {
        next(e);
    }
});

export { router };
