import mongoose from 'mongoose';

const VolumeSchema = mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        hoard: [{ type: mongoose.Types.ObjectId, ref: 'Issue' }],
        wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Issue' }],
    },
    {
        timestamps: true,
    }
);

const Volume = mongoose.model('Volume', VolumeSchema);

export { Volume };
