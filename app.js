import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Index from './src/routes/index';
import Todos from './src/routes/todos';
import List from './src/routes/list';
import User from './src/routes/user';
import SignUp from './src/routes/sign_up';
import db from './src/data/db.json';

let app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.set('db', db);

let todos = new Todos(app);
let lists = new List(app);
let index = new Index(app);
let users = new User(app);
let signup = new SignUp(app);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('Express server is listening on port:' + port);
});

export default app;
