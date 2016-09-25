import { UserModel as User } from '../data/User.schema';

export default class SignUp {

  constructor (app) {
    this.app = app;
    this.app.post('/signup', this.signup);
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
            res.json({ success: true });
          }
      });
    });
  }
};