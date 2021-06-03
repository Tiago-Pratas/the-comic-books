import { Publisher } from '../db/index.js';

const savePublisherPOST = async (req, res, next) => {
    try {
        const {
            name,
            apiRef,
            characters,
            volumes,
            story_arcs,
            description,
            location_address,
            location_city,
            location_state,
            image,
        } = req.body;
        //make sure there is no issue on DB
        const foundPublisher = await Publisher.findOne({ apiRef });

        if (!foundPublisher) {
            const newPublisher = new Publisher({
                name,
                apiRef,
                characters,
                volumes,
                story_arcs,
                description,
                location_address,
                location_city,
                location_state,
                image,
            });

            const savedPublisher = await newPublisher.save();

            return res.json(savedPublisher);
        }

        return res.status(403).json('An instace of this Publisher already exists');
    } catch (error) {
        return next(error);
    }
};

const findPublisherGET = async (req, res, next) => {
    try {
        const { apiRef } = req.body;

        const foundPerson = await Person.findOne({ apiRef });

        return !foundPerson ?
            res.json('There are no Persons') :
            res.json(foundPerson);
    } catch (error) {
        return next(error);
    }
};

export { savePublisherPOST, findPublisherGET };
