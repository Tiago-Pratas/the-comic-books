import express from 'express';
import axios from 'axios';
import { Issue } from '../db/models/issue.model.js';

const router = express.Router();


/**
 * GET /issues
 * 
 * get a list of all the issues limited to 100 per call
 */
router.get('/search', async (req, res, next) => {
    try {

        const field = req.body;

        const fieldValue = req.body;

        const response = await axios.get('https://comicvine.gamespot.com/api/issues', {
            params: {
                api_key: process.env.API_KEY,
                limit: '50',
                format: 'json',
                field: `${field}:${fieldValue}`,
            }
        });

        console.log(response.data.results);

        return res.status(200).json(response.data);
    }
    catch(e) {
        next(e);
    }
});

/**
 * GET issue/detal/:id
 * get a detailed view of a specific issue
 */
router.get('/detail/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://comicvine.gamespot.com/api/issue/4000-${id}`, {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
                
            }
        });

        return res.status(200).json(response.data.results)
    }
    catch (e) {
        next(e);
    }

})

/**
 * POST issue/detail/:id
 * 
 * add Issue to collection
 */
router.post('/detail/:id', async (req,res,next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://comicvine.gamespot.com/api/issue/4000-${id}`, {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
                
            }
        });

        const newIssue = await new Issue({
            number: response.data.results.issue_number,
            image: response.data.results.image.original_url,
            release: response.data.results.cover_date,
            description: response.data.results.description,
            volume: response.data.results.volume,
            credits: response.data.results.person_credits,
        });

        const savedIssue = await newIssue.save();


        console.log(savedIssue);

        return res.status(200).json(response.data.results)

    }
    catch(e) {
        next(e);
    }
})



export { router };