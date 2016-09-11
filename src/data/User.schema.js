import db from '../data/db';
import {ObjectId, Schema} from 'mongoose';

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: Schema.Types.Mixed,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.Mixed,
        required: true,
        unique: true
    },
    activeLists: [],
    archivedLists: []
});

export var UserModel = db.model('Users', UserSchema);