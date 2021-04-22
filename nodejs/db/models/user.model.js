import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    role: {
        type: String,
        enum: [
            'user',
            'admin',
        ],
        default: 'user'
    },
    subRole: { 
        type: String, 
        required: true
    },
},{
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export { User };