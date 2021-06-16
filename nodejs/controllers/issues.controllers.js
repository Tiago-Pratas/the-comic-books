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
        } = req.body;

        const image = req.body.image.original_url;
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
            console.log('lost', savedIssue);

            return res.json(savedIssue);
        } else {
            console.log('found', foundIssue);
            return res.json(foundIssue);
        };
    } catch (error) {
        return next(error);
    }
};

const findIssuesGET = async (req, res, next) => {
    try {
        const { apiRef } = req.params;

        const foundIssue = await Issue.findOne({ apiRef });

        return res.json(foundIssue);
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
        const { id } = req.params;

        const findIssues = await Issue.find({ owners: id });

        if (!findIssues.length) {
            return res.json('no issues found');
        }
        console.log(id);
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

const saveToWishlistPOST = async (req, res, next) => {
    try {
        const { apiRef, id } = req.body;

        const foundIssue = await Issue.findOneAndUpdate({ apiRef }, { $addToSet: { wishers: id } });


        return !foundIssue ?
            res.json('There is no such issue in our database') :
            res.json(foundIssue);
    } catch (error) {
        return next(error);
    }
};

const findWishlistGET = async (req, res, next) => {
    try {
        const { id } = req.params;

        const findIssues = await Issue.find({ wishers: id });

        if (!findIssues.length) {
            return res.json('no issues saved on your wishlist');
        }
        console.log(id);
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
    saveToWishlistPOST,
    findWishlistGET,
};
