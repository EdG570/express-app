import {ObjectId, Schema} from 'mongoose';

export default new Schema({
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