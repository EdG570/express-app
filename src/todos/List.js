export default class List {

  constructor(name) {
    this.name = name;
    this._tasks = [];
    this.active = true;
  }

  setName(newName) {
    this.name = newName;
  }

  getTasks() {
    return this._tasks;
  }

  addTask(task) {
    this._tasks.push(task);
  }

  toggleActive() {
    this.active = !this.active;
  }

  deleteTask(taskDesc) {
    let match = this._tasks.filter((task) => {
      return !(task.description === taskDesc);
    });

    this._tasks = match;
  }

  filterTasks(priority) {
    let filtered = this._tasks.filter((task) => {
      return task.priority === priority; 
    });

    return filtered;
  } 
}