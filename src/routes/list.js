import { ListModel } from '../data/List.schema';

export default class List {
  
  constructor (app) {
    this.app = app;
    this.app.get('/lists', this.getLists);
    this.app.post('/lists', this.createList);
    // this.app.get('/todos/active', this.getActiveTodos);

    // this.app.put('/todos/:id', this.updateTodo);
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

  // updateTodo(req, res) {
  //   const query = { _id: req.params.id };
  //   const update = {};

  //   if (req.body.description) update.description = req.body.description;
  //   if (req.body.priority) update.priority = req.body.priority;
  //   if (req.body.isComplete) update.isComplete = req.body.isComplete;

  //   TaskModel.findOneAndUpdate(query, update, { upsert: true }, (err, foundObj) => {
  //     if (err) return res.json(err);
  //     res.json(foundObj);
  //   });
  // }

  // deleteTodo(req, res) {
  //   const query = { _id: req.params.id };

  //   TaskModel.findOneAndRemove(query, (err, foundObj) => {
  //     if (err) return res.status(500).send();
  //     return res.status(200).send();
  //   });
  // }
};