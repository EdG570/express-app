import passport from 'passport';
import { UserModel as User } from '../data/User.schema';
import fs from 'fs';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import LocalStrategy from 'passport-local';

const fetchSecret = () => {
  let config = fs.readFileSync('./config.json', 'utf8');
  if (config) { config = JSON.parse(config); }
  return config.secret;
};

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password) {
  User.findOne({ email: email }), function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: fetchSecret()
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);