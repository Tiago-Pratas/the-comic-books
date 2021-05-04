import mongoose from 'mongoose';

const CollectibleSchema = mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        hoard: [{ type: mongoose.Types.ObjectId, ref: 'Volume' }],
    },
    {
        timestamps: true,
    }
);

const Collectible = mongoose.model('Collectible', CollectibleSchema);

export { Collectible };
