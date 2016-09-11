import db from '../data/db';
import {ObjectId, Schema} from 'mongoose';

const ListSchema = Schema({

    title: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true
    }

    // tasks: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Tasks'
    // }]
});

export const ListModel = db.model('Lists', ListSchema);