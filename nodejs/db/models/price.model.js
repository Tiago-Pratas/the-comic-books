import mongoose from 'mongoose';

const PriceSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buy: {
        type: String,
        trim: true,
    },
    sell: {
        type: String,
        trim: true,
    },
    forSale: {
        type: Boolean,
        required: true,
        default: false,
    },
    forTrade: {
        type: Boolean,
        required: true,
        default: false,
    },
    localImage: {
        type: String,
    },
    condition: {
        type: String,
        trim: true,
    },
    issue: {
        type: mongoose.Types.ObjectId,
        ref: 'Issue',
    },
});

export const Price = mongoose.model('Price', PriceSchema);

