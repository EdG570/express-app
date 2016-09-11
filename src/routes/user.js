import { UserModel } from '../data/User.schema';

export default class User {
  
  constructor (app) {
    this.app = app;
    this.app.get('/user/:userid', this.getUser);
    this.app.post('/user', this.createUser);
  }

  getUser(req, res, next) {
    var id = req.params.userid;

    UserModel.find({ _id: id }, (err, results) => {
      if (err) res.json(err);
      res.json(results);
    });
  }

  createUser(req, res, next) {
    new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).save(function (err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }

}