import { StoryArc } from '../db/index.js';

const saveStoryArcPOST = async (req, res, next) => {
    try {
        const {
            name,
            issues,
            description,
            image,
            publisher,
        } = req.body;
        //make sure there is no issue on DB
        const foundStoryArc = await StoryArc.findOne({ apiRef });

        if (!foundStoryArc) {
            const newStoryArc = new StoryArc({
                name,
                issues,
                description,
                image,
                publisher,
            });

            const savedStoryArc = await newStoryArc.save();

            return res.json(savedStoryArc);
        }

        return res.status(403).json('An instace of this StoryArc already exists');
    } catch (error) {
        return next(error);
    }
};

const findStoryArcGET = async (req, res, next) => {
    try {
        const { apiRef } = req.body;

        const foundStoryArc = await StoryArc.findOne({ apiRef });

        return !foundStoryArc ?
            res.json('There are no StoryArcs') :
            res.json(foundStoryArc);
    } catch (error) {
        return next(error);
    }
};

export { saveStoryArcPOST, findStoryArcGET };
