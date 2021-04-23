import mongoose from 'mongoose';

const volumeSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true,
    },
    api_detail_url: {
        type: String,
        required: true,

    },
    issues: [{type: mongoose.Types.ObjectId, ref: 'Issue'}],
    complete: {
        type: Boolean,
        required: true,
        default: false,
    }

    },{
    timestamps: true,
});

const Volume = mongoose.model('Volume', volumeSchema);

export { Volume }