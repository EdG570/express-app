export default class Todos {
  
  constructor (app) {
    this.app = app;
    this.app.get('/todos', this.getTodos);
  }

  getTodos(req, res, next) {
    const db = req.app.get('db');
    const data = db.user.todos.activeLists[0];
    let incompleteTasks = '';
    let completedTasks = '';

    incompleteTasks += `<ul>`;
    completedTasks += `<ul>`

    data.tasks.forEach((task) => {

      if (!task.isComplete) {
        incompleteTasks += `
          <li>
            <h3>${ task.description }</h3>
          </li>
        `;
      } else {
        completedTasks += `
          <li>
            <h3>${ task.description }</h3>
          </li>
        `;
      }
    });

    incompleteTasks += `</ul>`;
    completedTasks += `</ul>`;

    res.send(`
      <h2>${ data.name }</h2>
      ${ incompleteTasks }
      
      <h3>Completed:</h3>
      ${ completedTasks }
    `);
  }

};