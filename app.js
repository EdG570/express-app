import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import Index from './src/routes/index';
import Todos from './src/routes/todos';
import List from './src/routes/list';
import User from './src/routes/user';
import db from './src/data/db.json';

let app = express();

app.listen(8080, () => {
  console.log('Express server is listening on port:8080');
});

app.use(bodyParser());

app.set('db', db);


let todos = new Todos(app);
let lists = new List(app);
let index = new Index(app);
let users = new User(app);

export default app;
