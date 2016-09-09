export default class User {

  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.activeList = null;
    this.archivedList = null;
  }

  getFullName() {
    return `${ this.firstName } ${ this.lastName}`;
  }

  setEmail(newEmail) {
    this.email = newEmail;
  }

  setPassword(newPw) {
    this.password = newPw;
  }

  setActiveList(list) {
    this.activeList = list;
  }

  setArchivedList(list) {
    this.archivedList = list;
  }

}