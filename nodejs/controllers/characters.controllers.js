import { Character } from '../db/index.js';

const saveCharacterPOST = async (req, res, next) => {
    try {
        const {
            aliases,
            name,
            real_name,
            birth,
            apiRef,
            character_enemies,
            character_friends,
            count_of_issue_appearances,
            creators,
            description,
            first_appeared_in_issue,
            image,
            issues_died_in,
            publisher,
            story_arc_credits,
            team_enemies,
            team_friends,
            teams,
            volume_credits,
        } = req.body;
        //make sure there is no issue on DB
        const foundCharacter = await Character.findOne({ apiRef });

        if (!foundCharacter) {
            const newCharacter = new Character({
                aliases,
                name,
                real_name,
                birth,
                apiRef,
                character_enemies,
                character_friends,
                count_of_issue_appearances,
                creators,
                description,
                first_appeared_in_issue,
                image,
                issues_died_in,
                publisher,
                story_arc_credits,
                team_enemies,
                team_friends,
                teams,
                volume_credits,
            });

            const savedCharacter = await newCharacter.save();

            return res.json(savedCharacter);
        }

        return res.status(403).json('An instace of this character already exists');
    } catch (error) {
        return next(error);
    }
};

const findCharacterGET = async (req, res, next) => {
    try {
        const { apiRef } = req.body;

        const foundCharacter = await Character.findOne({ apiRef });

        return !foundCharacter ?
            res.json('There are no Characters') :
            res.json(foundCharacter);
    } catch (error) {
        return next(error);
    }
};

export { saveCharacterPOST, findCharacterGET };
