import { TaskModel } from '../data/Task.schema';

export default class Todos {
  
  constructor (app) {
    this.app = app;
    this.app.get('/todos', this.getTodos);
    this.app.get('/todos/active', this.getActiveTodos);

    this.app.put('/todos/:id', this.updateTodo);
    this.app.post('/todos', this.createTodo);
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

    // TaskModel.findOneAndUpdate(query, req.body.description, {upsert:true}, (err, results) => {
    //   if (err) return res.send(500, { error: err });
    //   return res.send("succesfully saved");
    // });

     TaskModel.findOne(query, (err, foundObj) => {
      if (err) { 
        console.log(error);
        res.status(500).send;
      } else {

        if (!foundObj) {
          res.status(404).send;

        } else {

          if (req.body.description) {
            foundObj.description = req.body.description;
          }

          if (req.body.priority) {
            foundObj.priority = req.body.priority;
          }

          foundObj.save((err, updatedObj) => {
            if (err) {
              console.log(err);
              res.status(500).send;
            } else {
              res.send(updatedObj);
            }
          });
        }
      }

    });
  }
};