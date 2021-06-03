import mongoose from 'mongoose';
import { removeNewlines } from '../../helpers/mongo.helpers.js';

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
        count_of_issues: {
            type: Number,
        },
        description: {
            type: String,
            set: removeNewlines,
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
