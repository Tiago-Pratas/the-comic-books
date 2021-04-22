import mongoose from 'mongoose';

const volumeSchema = mongoose.Schema({
    issues: [{type: mongoose.Types.ObjectId, ref: 'Issue'}],
    completion: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        complete: {
            type: Boolean,
            required: true,
            default: false,
        }

    }

},{
    timestamps: true,
});