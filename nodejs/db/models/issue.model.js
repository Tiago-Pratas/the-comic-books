import mongoose from 'mongoose';

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
        chracter_dies_in: [
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
            //create a function that will remove all html tags
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
            icon_url: {},
            original_url: {},
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
