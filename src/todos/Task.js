export default class Task {

  constructor(description, priority) {
    this.description = description;
    this.priority = priority;
    this._isComplete = false;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  setPriority(newPriority) {
    this.priority = newPriority;
  }

  isComplete() {
    return this._isComplete;
  }

  toggleTaskStatus() {
    this._isComplete = !this._isComplete;
  }
}