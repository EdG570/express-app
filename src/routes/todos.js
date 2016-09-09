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

    TaskModel.findOne(query, (err, foundObj) => {
      if (err) { 
        res.status(500).send();
      } else {

        if (!foundObj) {
          res.status(404).send();

        } else {

          if (req.body.description) foundObj.description = req.body.description;
          if (req.body.priority) foundObj.priority = req.body.priority;
          if (req.body.isComplete) foundObj.isComplete = req.body.isComplete;

          foundObj.save((err, updatedObj) => {
            if (err) {
              res.status(500).send();
            } else {
              res.send(updatedObj);
            }
          });
        }
      }
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