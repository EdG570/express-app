export default class Index {
  
  constructor (app) {
    this.app = app;
    this.app.get('/', this.getIndex);
  }

  getIndex(req, res, next) {
    res.json('ok');
  }

}