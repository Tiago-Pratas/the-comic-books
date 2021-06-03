import mongoose from 'mongoose';

const PersonSchema = mongoose.Schema({
    aliases: {
        type: String,
        set: removeNewlines,
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

const removeNewlines = (aliases) => {
    if (aliases === null || aliases === '') return false;

    return aliases.split(/\r\n|\r|\n/);
};

export const Person = ('Person', PersonSchema);

