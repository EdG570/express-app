import fs from 'fs';
import mongoose from 'mongoose';

let config = fs.readFileSync('./config.json', 'utf8');

if (config) {
    config = JSON.parse(config);
}

export default mongoose.connect(config.dbpath);