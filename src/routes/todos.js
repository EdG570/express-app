import Tasks from '../data/Task.schema';

export default class Todos {
  
  constructor (app) {
    this.app = app;
    this.app.get('/todos', this.getTodos);
  }

  getTodos(req, res, next) {
    Tasks.find({}, (err, results) => {
      res.json(results);
    });
  }

};