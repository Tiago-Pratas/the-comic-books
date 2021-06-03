import mongoose from 'mongoose';
import { removeTags } from '../../helpers/mongo.helpers.js';

const StoryArcSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    issues: [
        {
            name: {
                type: String,
            },
            id: {
                type: String,
            },
        },
    ],
    description: {
        type: String,
        set: removeTags,
    },
    image: {
        type: String,
    },
    publisher: {
        apiRef: {
            type: String,
        },
        name: {
            type: String,
        },
    },
},
{
    timestamps: true,
});

export const StoryArc = mongoose.model('StoryArch', StoryArcSchema);
