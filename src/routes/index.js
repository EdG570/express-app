export default class Index {
  
  constructor (app) {
    this.app = app;
    this.app.get('/', this.getIndex);
  }

  getIndex(req, res, next) {
    res.send(`
      <h1>Welcome to the Todo App!</h1>
    `);
  }

}