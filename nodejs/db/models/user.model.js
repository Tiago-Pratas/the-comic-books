import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        profilePic: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
        },
        password: {
            type: String || null,
            minlength: 8,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: false,
            required: true,
        },
        googleId: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);

export { User };
