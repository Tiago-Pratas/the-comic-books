import mongoose from 'mongoose';
import { removeTags } from '../../helpers/mongo.helpers.js';

const IssueSchema = mongoose.Schema(
    {
        apiRef: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
        },
        character_credits: [
            {
                apiRef: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        character_dies_in: [
            {
                apiRef: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        cover_date: {
            type: String,
        },
        description: {
            type: String,
            set: removeTags,
        },
        issue_number: {
            type: String,
        },
        person_credits: [
            {
                apiRef: {
                    type: String,
                },
                name: {
                    type: String,
                },
                role: {
                    type: String,
                },
            },
        ],
        volume: {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        image: {
            type: String,
        },
        owners: [
            {
                type: mongoose.Types.ObjectId, ref: 'User',
            },
        ],

    },
    {
        timestamps: true,
    },
);

const Issue = mongoose.model('Issue', IssueSchema);

export { Issue };
