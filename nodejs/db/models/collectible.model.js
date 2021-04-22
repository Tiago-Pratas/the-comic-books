import mongoose from 'mongoose';

const CollectibleSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Issue'}],
    hoard: [{type: mongoose.Types.ObjectId, ref: 'Issue'}],

},{
    timestamps: true,
});

const Collectible = mongoose.model('Collectible', CollectibleSchema);

export { Collectible };