import { UserModel as User } from '../data/User.schema';
import jwt from 'jwt-simple';
import fs from 'fs';

export default class SignUp {
  constructor (app) {
    this.app = app;
    this.app.post('/signup', this.signup);
  }

  static secretForUser() {
    let config = fs.readFileSync('./config.json', 'utf8');
    if (config) { config = JSON.parse(config); }
    return config.secret;
  }

  static tokenForUser(user) {
    const timestamp = new Date().getTime();
    const secret = SignUp.secretForUser();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
  }

  signup(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(422).send({ error: 'You must provide an email and password'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use'});
      }

      const user = new User({
          email: email,
          password: password
      });

      user.save(function(err, data) {
          if (err) {
            res.json(err);
          }
          else {
            res.json({ token: SignUp.tokenForUser(user) });
          }
      });
    });
  }
};
