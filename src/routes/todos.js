import { TaskModel } from '../data/Task.schema';

export default class Todos {
  
  constructor (app) {
    this.app = app;
    this.app.get('/todos', this.getTodos);
    this.app.get('/todos/active', this.getActiveTodos);

    this.app.put('/todos/:id', this.updateTodo);
    this.app.post('/todos', this.createTodo);
    this.app.delete('/todos/:id', this.deleteTodo);
  }

  getTodos(req, res) {
    TaskModel.find({}, function(err, results) {
      res.json(results);
    });
  }

  getActiveTodos(req, res) {
    TaskModel.find({isComplete: false}, (err, results) => {
      if (err) res.json(err);
      res.json(results);
    });
  }

  createTodo(req, res) {
    new TaskModel({
      description: req.body.description,
      priority: req.body.priority,
      isComplete: false
    }).save(function (err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }

  updateTodo(req, res) {
    const query = { _id: req.params.id };
    const update = {};

    if (req.body.description) update.description = req.body.description;
    if (req.body.priority) update.priority = req.body.priority;
    if (req.body.isComplete) update.isComplete = req.body.isComplete;

    TaskModel.findOneAndUpdate(query, update, { upsert: true }, (err, foundObj) => {
      if (err) return res.json(err);
      res.json(foundObj);
    });
  }

  deleteTodo(req, res) {
    const query = { _id: req.params.id };

    TaskModel.findOneAndRemove(query, (err, foundObj) => {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  }
};