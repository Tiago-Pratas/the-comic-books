import mongoose from 'mongoose';
import { removeTags } from '../../helpers/mongo.helpers.js';

const PublisherSchema = mongoose.Schema({
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
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
    ],
    volumes: [
        {
            apiRef: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    ],
    story_arcs: [
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
    location_address: {
        type: String,
    },
    location_city: {
        type: String,
    },
    location_state: {
        type: String,
    },
    image: {
        type: String,
    },
},
{
    timestamps: true,
});

export const Publisher = mongoose.model('Publisher', PublisherSchema);

