export default class Profile {
  
  constructor (app) {
    this.app = app;
    this.app.get('/profile', this.getProfile);
  }

  getProfile(req, res, next) {
    const db = req.app.get('db');
    const user = db.user;

    res.send(`
      <h1>User Profile</h1>
      <h3>Name: ${user.name}</h3>
      <h3>Email: ${user.email}</h3>
    `);
  }

}