import { TaskModel } from '../data/Task.schema';

export default class Todos {
  
  constructor (app) {
    this.app = app;
    this.app.get('/todos', this.getTodos);
    this.app.get('/todos/active', this.getActiveTodos);


    this.app.post('/todos', this.createTodo);
  }

  getTodos(req, res) {
    TaskModel.find({}, function(err, results) {

      console.log(results);
      res.json(results);
    });
  }

  getActiveTodos(req, res) {
    TaskModel.find({isComplete: true}, (err, results) => {
      res.json(results);
    });
  }

  createTodo(req, res) {
    new TaskModel({
      description: req.body.description,
      isComplete: false
    }).save(function (err, data) {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }
};