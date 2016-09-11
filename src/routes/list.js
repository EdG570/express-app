import { ListModel } from '../data/List.schema';

export default class List {
  
  constructor (app) {
    this.app = app;
    this.app.get('/lists', this.getLists);
    this.app.post('/lists', this.createList);
    this.app.delete('/lists/:listid', this.deleteList);
    // this.app.get('/todos/active', this.getActiveTodos);

    this.app.put('/lists/:listid', this.updateList);
    // this.app.post('/todos', this.createTodo);
    // this.app.delete('/todos/:id', this.deleteTodo);
  }

  getLists(req, res) {
    ListModel.find({}, function(err, results) {
      res.json(results);
    });
  }

  // getActiveTodos(req, res) {
  //   TaskModel.find({isComplete: false}, (err, results) => {
  //     if (err) res.json(err);
  //     res.json(results);
  //   });
  // }

  createList(req, res) {
    new ListModel({
      title: req.body.title,
      active: true
    }).save(function (err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }

  updateList(req, res) {
    const query = { _id: req.params.listid };
    const update = {};

    if (req.body.title) update.title = req.body.title;
    if (req.body.active) update.active = req.body.active;

    ListModel.findOneAndUpdate(query, update, { upsert: true }, (err, foundObj) => {
      if (err) return res.json(err);
      res.json(foundObj);
    });
  }

  deleteList(req, res) {
    const query = { _id: req.params.listid };

    ListModel.findOneAndRemove(query, (err, foundObj) => {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  }
};