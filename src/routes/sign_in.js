import { requireSignIn } from '../services/require_auth';
import fs from 'fs';

export default class SignIn {
  constructor (app) {
    this.app = app;
    this.app.post('/signin', requireSignIn, this.signin);
  }

  static secretForUser() {
    let config = fs.readFileSync('./config.json', 'utf8');
    if (config) { config = JSON.parse(config); }
    return config.secret;
  }

  static tokenForUser(user) {
    const timestamp = new Date().getTime();
    const secret = SignIn.secretForUser();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
  }

  signin(req, res, next) {
    res.send({ token: SignIn.tokenForUser(req.user) });
  }

};