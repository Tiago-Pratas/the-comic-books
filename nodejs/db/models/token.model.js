import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    verificationToken: {
        type: String,
        trim: true,
        required: true,
    },
    pwdReset: {
        type: Boolean,
        default: false,
    },
    expireAt: {
        type: Date,
        default: Date.now(),
        expires: 60000,
    },
});

const Token = mongoose.model('Token', tokenSchema);

export { Token };
