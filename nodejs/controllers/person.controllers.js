import { Person } from '../db/index.js';

const savePersonPOST = async (req, res, next) => {
    try {
        const {
            aliases,
            apiRef,
            created_characters,
            deck,
            count_of_issue_appearances,
            image,
            issues,
            website,
        } = req.body;
        //make sure there is no issue on DB
        const foundPerson = await Person.findOne({ apiRef });

        if (!foundPerson) {
            const newPerson = new Person({
                aliases,
                apiRef,
                created_characters,
                deck,
                count_of_issue_appearances,
                image,
                issues,
                website,
            });

            const savedPerson = await newPerson.save();

            return res.json(savedPerson);
        }

        return res.status(403).json('An instace of this Person already exists');
    } catch (error) {
        return next(error);
    }
};

const findPersonGET = async (req, res, next) => {
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

export { savePersonPOST, findPersonGET };
