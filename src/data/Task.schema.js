import db from '../data/db';
import {ObjectId, Schema} from 'mongoose';

const TaskSchema = Schema({
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
        default: 1,
        min: 1,
        max: 100
    },
    listId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Lists'
    } 
});

export var TaskModel = db.model('Tasks', TaskSchema);