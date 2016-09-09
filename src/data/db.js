import fs from 'fs';
import mongoose from 'mongoose';

let config = fs.readFileSync('./config.json', 'utf8');

if (config) {
    config = JSON.parse(config);
}
console.log(config.dbpath);

let db = mongoose.connect(config.dbpath);

db.connection.on('error', console.error.bind(console, 'connection error:'));
db.connection.on('open', function() {
    console.log('CONNECTED');
});
db.connection.on('close', function() {
    console.log('DISCONNECTED');
});

export default db;