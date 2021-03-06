import { TaskModel } from '../data/Task.schema';
import { requireAuth } from '../services/require_auth';

export default class Todos {
  
  constructor (app) {
    this.app = app;
    this.app.get('/todos', requireAuth, this.getTodos);
    this.app.get('/todos/:listid', this.getListTodos);
    // this.app.get('/todos/:id', this.getTodo);
    this.app.get('/todos/active', this.getActiveTodos);

    this.app.put('/todos/:id', this.updateTodo);
    this.app.post('/todos/:listid', this.createTodo);
    this.app.delete('/todos/:id', this.deleteTodo);
  }

  getTodos(req, res) {
    TaskModel.find({}, function(err, results) {
      res.json(results);
    });
  }

  getTodo(req, res) {
    var id = req.params.id;

    TaskModel.find({_id: id})
        .populate('listId')
        .exec(function(err, results) {
          res.json(results);
        });
  }

  getListTodos(req, res) {
    var id = req.params.listid;

    TaskModel.find({listId: id})
        .populate('listId')
        .exec(function(err, results) {
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
    var id = req.params.listid;

    /**
     * TODO: Error check that list exists
     */

    new TaskModel({
      description: req.body.description,
      priority: req.body.priority,
      isComplete: false,
      listId: id
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