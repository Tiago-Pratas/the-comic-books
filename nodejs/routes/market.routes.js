import express from 'express';
import { Issue } from '../db/models/issue.model.js';
import { Price } from '../db/models/price.model.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const findPrices = await Price.find({ forSale: true });

        const findIssues = await Promise.all(
            findPrices.map(async (issue) => {
                const issues = Issue.findById({ _id: issue.issue }).lean();
                return issues;
            })
        );

        return res.render('collection', {
            issue: findIssues,
            user: req.user.toJSON(),
        });
    } catch (e) {
        next(e);
    }
});

export { router };
