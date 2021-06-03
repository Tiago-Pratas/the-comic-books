import mongoose from 'mongoose';
import { removeNewlines, removeTags } from '../../helpers/mongo.helpers.js';

const CharacterSchema = mongoose.Schema({
    aliases: {
        type: [String],
        set: removeNewlines,
    },
    name: {
        type: String,
    },
    real_name: {
        type: String,
    },
    birth: {
        type: String,
    },
    apiRef: {
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
    character_friends: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    count_of_issue_appearances: {
        type: Number,
    },
    creators: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    description: {
        type: String,
        set: removeTags,
    },
    first_appeared_in_issue: {
        apiRef: {
            type: String,
        },
        name: {
            type: String,
        },
        issue_number: {
            type: String,
        },
    },
    image: {
        type: String,
    },
    issues_died_in: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    publisher: {
        apiRef: {
            type: String,
        },
        name: {
            type: String,
        },
    },
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
    team_enemies: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    team_friends: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    teams: [
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
}, {
    timestamps: true,
});

export const Character = mongoose.model('Character', CharacterSchema);
