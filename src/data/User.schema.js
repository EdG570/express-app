import db from '../data/db';
import {ObjectId, Schema} from 'mongoose';

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

export const UserModel = db.model('Users', UserSchema);