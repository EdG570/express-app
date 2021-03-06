import { UserModel } from '../data/User.schema';

export default class User {
  
  constructor (app) {
    this.app = app;
    this.app.get('/user/:userid', this.getUser);
    this.app.post('/user', this.createUser);
    this.app.put('/user/:userid', this.updateUser);
    this.app.delete('/user/:userid', this.deleteUser);
    this.app.get('/users', this.getUsers);
  }

  getUsers(req, res, next) {
    UserModel.find({}, (err, results) => {
      if (err) res.json(err);
      res.json(results);
    });
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

  updateUser(req, res) {
    const query = { _id: req.params.userid };
    const update = {};

    if (req.body.name) update.name = req.body.name;
    if (req.body.email) update.email = req.body.email;
    if (req.body.password) update.password = req.body.password;

    UserModel.findOneAndUpdate(query, update, { upsert: true }, (err, foundObj) => {
      if (err) return res.json(err);
      res.json(foundObj);
    });
  }

  deleteUser(req, res, next) {
    const id = req.params.userid;
    const query = { _id: id };

    UserModel.findOneAndRemove(query, (err, foundObj) => {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  }
}