import {ObjectId, Schema} from 'mongoose';

export default new Schema({
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