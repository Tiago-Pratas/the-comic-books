import mongoose from 'mongoose';
import { removeTags } from '../../helpers/mongo.helpers.js';

const VolumeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        apiRef: {
            type: String,
            required: true,
        },
        characters: [
            {
                apiRef: {
                    type: String,
                },
                name: {
                    type: String,
                },
                issue_count: {
                    type: String,
                },
            },
        ],
        image: {
            type: String,
        },
        start_year: {
            type: String,
        },
        first_issue: {
            apiRef: {
                type: String,
            },
            issue_number: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        issues: [
            {
                name: {
                    type: String,
                },
                apiRef: {
                    type: String,
                },
                issue_number: {
                    type: String,
                },
            },
        ],
        count_of_issues: {
            type: Number,
        },
        description: {
            type: String,
            set: removeTags,
        },
        publisher: {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        people: [
            {
                apiRef: {
                    type: String,
                },
                name: {
                    type: String,
                },
                count: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Volume = mongoose.model('Volume', VolumeSchema);

export { Volume };
