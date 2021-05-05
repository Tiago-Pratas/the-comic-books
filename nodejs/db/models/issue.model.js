import mongoose from 'mongoose';

const IssueSchema = mongoose.Schema(
    {
        number: {
            type: String,
            trim: true,
            required: true,
        },
        image: {
            type: String,
            required: true,
            unique: true,
        },
        localImage: {
            type: String,
            trim: true,
        },
        release: {
            type: String,
            trim: true,
        },
        volume: {
            name: {
                type: String,
                required: true,
            },
            api_detail_url: {
                type: String,
                required: true,
            },
        },
        condition: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        credits: [
            {
                name: {
                    type: String,
                    required: true,
                },
                role: {
                    type: String,
                    required: true,
                },
                api_detail_url: {
                    type: String,
                    required: true,
                },
            },
        ],
        apiRef: {
            type: Number,
            required: true,
            unique: true,
        },
        avgPrice: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Price',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Issue = mongoose.model('Issue', IssueSchema);

export { Issue };
