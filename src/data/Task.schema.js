import db from '../data/db';
import {ObjectId, Schema} from 'mongoose';

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 100
    }
});


export default db.model('Tasks', TaskSchema);