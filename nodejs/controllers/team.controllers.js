import { Team } from '../db/index.js';

const saveTeamPOST = async (req, res, next) => {
    try {
        const {
            aliases,
            name,
            character_enemies,
            characters,
            count_of_team_members,
            description,
            image,
            issues_disbanded_in,
            issue_credits,
            volume_credits,
            story_arc_credits,
        } = req.body;
        //make sure there is no issue on DB
        const foundTeam = await Team.findOne({ apiRef });

        if (!foundTeam) {
            const newTeam = new Team({
                aliases,
                name,
                character_enemies,
                characters,
                count_of_team_members,
                description,
                image,
                issues_disbanded_in,
                issue_credits,
                volume_credits,
                story_arc_credits,
            });

            const savedTeam = await newTeam.save();

            return res.json(savedTeam);
        }

        return res.status(403).json('An instace of this Team already exists');
    } catch (error) {
        return next(error);
    }
};

const findTeamGET = async (req, res, next) => {
    try {
        const { apiRef } = req.body;

        const foundTeam = await Team.findOne({ apiRef });

        return !foundTeam ?
            res.json('There are no Teams') :
            res.json(foundTeam);
    } catch (error) {
        return next(error);
    }
};

export { saveTeamPOST, findTeamGET };
