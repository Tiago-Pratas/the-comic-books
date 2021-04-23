import mongoose from 'mongoose';

const IssueSchema = mongoose.Schema({
    number: {
            type: String,
            trim: true,
            required: true,
    },
    image: {
        type: String,
        required: true
    },
    localImage: {
        type: String,
        trim: true

    },
    release: {
        type: String,
        trim: true,
        required: true,
    },
    volume:  {
        name: {
            type: String,
            required: true,
        },
        api_detail_url: {
            type: String,
            required: true,
        }

    },
    condition: {
        type: String,
        trim: true,
    },
    price: {
        bought: {
            type: String,
            trim: true,
        },
        sold: {
            type: String,
            trim: true,
        }
    },
    description: {
        type: String,
        trim: true,
    },
    credits: [{
            name: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                required: true
            },
            api_detail_url: {
                type: String,
                required: true,
                unique: true,
            } 
    }],
    tradeoff: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {
    timestamps: true,
});

const Issue = mongoose.model('Issue', IssueSchema);

export { Issue };