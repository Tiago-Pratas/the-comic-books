import express from 'express';
import axios from 'axios';
import { Issue } from '../db/models/issue.model.js';
import { Volume } from '../db/models/volume.model.js';

const router = express.Router();


/**
 * GET /search
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
router.post('/detail/add/:id', async (req,res,next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://comicvine.gamespot.com/api/issue/4000-${id}`, {
            params: {
                api_key: process.env.API_KEY,
                format: 'json',
                
            }
        });

        const newIssue = new Issue({
            number: response.data.results.issue_number,
            image: response.data.results.image.original_url,
            release: response.data.results.cover_date,
            description: response.data.results.description,
            volume: response.data.results.volume,
            credits: response.data.results.person_credits,
        });

        const savedIssue = await newIssue.save();

        console.log(savedIssue)

        return res.status(200).json(response.data)

    }
    catch(e) {
        next(e);
    }
});

/**
 * GET collection/
 * get a list of issues in a collection
 */
router.get('/collection', async (req, res, next) => {
    try {
        const { name } = req.body;
        const findVolume = await Issue.find({ 'volume.name': name });

        
        if(!findVolume) {

            console.log("couldn't find your thingy")

            const newVolume = new Volume ({
                name: findVolume[0].volume.name,
                api_detail_url: findVolume[0].volume.api_detail_url,
                issues: [...findVolume],
            });

            console.log(newVolume);
            
            return res.json(newVolume)
        }
        else {
            const existingVolume = await Volume.findOneAndUpdate({ name }, { issues: $push(findVolume) });

            const updatedVolume = existingVolume.save();

            return res.status(200).json(updatedVolume);
        }

    }catch(e){
        next(e);
    }
})



export { router };