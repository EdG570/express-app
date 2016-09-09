import db from '../data/db';
import {ObjectId, Schema} from 'mongoose';

const ListSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true
    },

    tasks: [
        ObjectId
    ]
});

export default db.model('Lists', ListSchema)