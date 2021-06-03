import { Volume } from '../db/index.js';

const saveVolumePOST = async (req, res, next) => {
    try {
        const {
            name,
            apiRef,
            characters,
            issues,
            image,
            first_issue,
            count_of_issues,
            description,
            publisher,
            people,
            start_year,
        } = req.body;
        //make sure there is no issue on DB
        const foundVolume = await Volume.findOne({ apiRef });

        if (!foundVolume) {
            const newVolume = new Volume({
                name,
                apiRef,
                characters,
                issues,
                image,
                first_issue,
                count_of_issues,
                description,
                publisher,
                people,
                start_year,
            });

            const savedVolume = await newVolume.save();

            return res.json(savedVolume);
        }

        return res.status(403).json('An instace of this issue already exists');
    } catch (error) {
        return next(error);
    }
};

const findVolumeGET = async (req, res, next) => {
    try {
        const { apiRef } = req.body;

        const foundVolume = await Volume.findOne({ apiRef });

        return !foundVolume ?
            res.json('There are no volumes') :
            res.json(foundVolume);
    } catch (error) {
        return next(error);
    }
};

export { saveVolumePOST, findVolumeGET };
