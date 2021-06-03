import mongoose from 'mongoose';

const TeamSchema = mongoose.Schema({
    aliases: {
        type: String,
    },
    name: {
        type: String,
    },
    character_enemies: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    characters: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    count_of_team_members: {
        type: String,
    },
    description: {
        type: String,
        //define a setter function to remove html tags
    },
    image: {
        type: String,
    },
    issues_disbanded_in: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    issue_credits: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    volume_credits: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    story_arc_credits: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],

}, {

});

export const Team = mongoose.model('Team', TeamSchema);

