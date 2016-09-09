import { expect } from 'chai';
import User from '../todos/User';
import MasterList from '../todos/MasterList';

describe('User class', () => {
  let user;

  beforeEach(() => {
    user = new User('John', 'Doe', 'JDoe@gmail.com', 'abc123');
  }); 

  it('should initialize a User instance', () => {
    expect(user).to.be.an.instanceOf(User);
  });
 
  it('should return users full name', () => {
    expect(user.getFullName()).to.equal('John Doe');
  });

  it('should update users email', () => {
    expect(user.email).to.equal('JDoe@gmail.com');
    user.setEmail('Red@hotmail.com');
    expect(user.email).to.equal('Red@hotmail.com'); 
  });
  
  it('should update the users password', () => {
    expect(user.password).to.equal('abc123');
    user.setPassword('coolbeans!')
    expect(user.password).to.equal('coolbeans!');
  });

  it('should set the activeList list', () => {
    const newList = new MasterList();

    expect(user.activeList).to.equal(null);
    user.setActiveList(newList);
    expect(user.activeList).to.be.an.instanceOf(MasterList);
  });

  it('should set the archivedList list', () => {
    const newList = new MasterList();

    expect(user.archivedList).to.equal(null);
    user.setArchivedList(newList);
    expect(user.archivedList).to.be.an.instanceOf(MasterList);
  });

  it('should move a list from one master list to another', () => {
    const listA = new MasterList();
    const listB = new MasterList();

    user.setActiveList(listA);
    user.setArchivedList(listB);
    user.activeList

  });

});
