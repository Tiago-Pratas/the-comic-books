import { Issue } from '../db/index.js';

const saveIssuesPOST = async (req, res, next) => {
    try {
        const {
            apiRef,
            name,
            character_credits,
            character_dies_in,
            cover_date,
            description,
            issue_number,
            person_credits,
            volume,
            image,
        } = req.body;
        //make sure there is no issue on DB
        const foundIssue = await Issue.findOne({ apiRef });

        if (!foundIssue) {
            const newIssue = new Issue({
                apiRef,
                name,
                character_credits,
                character_dies_in,
                cover_date,
                description,
                issue_number,
                person_credits,
                volume,
                image,
            });

            const savedIssue = await newIssue.save();

            return res.json(savedIssue);
        }

        return res.status(403).json('An instace of this issue already exists');
    } catch (error) {
        return next(error);
    }
};

const findIssuesGET = async (req, res, next) => {
    try {
        const { apiRef } = req.body;

        const foundIssue = await Issue.findOne({ apiRef });

        return !foundIssue ?
            res.json('There are no issues') :
            res.json(foundIssue);
    } catch (error) {
        return next(error);
    }
};

const saveToCollectionPOST = async (req, res, next) => {
    try {
        const { apiRef, id } = req.body;

        const foundIssue = await Issue.findOneAndUpdate({ apiRef }, { $addToSet: { owners: id } });

        return !foundIssue ?
            res.json('There is no such issue in our database') :
            res.json(foundIssue);
    } catch (error) {
        return next(error);
    }
};

const findCollectionGET = async (req, res, next) => {
    try {
        const { id } = req.body;

        const findIssues = await Issue.find({ owners: id });

        return res.json(findIssues);
    } catch (error) {
        return next(error);
    }
};

const deleteFromColectionPATCH = async (req, res, next) => {
    try {
        const { apiRef, id } = req.body;

        const findIssues = await Issue.findOneAndUpdate(
            { apiRef, owners: id },
            { $pull: { owners: id } });

        return res.json(findIssues);
    } catch (error) {
        return next(error);
    }
};

export {
    saveIssuesPOST,
    findIssuesGET,
    findCollectionGET,
    deleteFromColectionPATCH,
    saveToCollectionPOST,
};
