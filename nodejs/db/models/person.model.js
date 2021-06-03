import mongoose from 'mongoose';
import { removeNewlines } from '../../helpers/mongo.helpers.js';

const PersonSchema = mongoose.Schema({
    aliases: {
        type: String,
        set: removeNewlines,
    },
    apiRef: {
        type: String,
    },
    deck: {
        type: String,
    },
    count_of_issue_appearances: {
        type: String,
    },
    image: {
        type: String,
    },
    birth: {
        type: String,
    },
    country: {
        type: String,
    },
    created_characters: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    issues: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    website: {
        type: String,
    },
}, {
    timestamps: true,
});

export const Person = mongoose.model('Person', PersonSchema);

