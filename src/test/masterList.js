import { expect } from 'chai';
import MasterList from '../todos/MasterList';

describe('MasterList class', () => {
  let master, masterWithLists, list, lists;

  beforeEach(() => {

    list = { name: 'Chores', tasks: [], _active: true };

    master = new MasterList();
    masterWithLists = new MasterList();

    lists = [
      { name: 'Chores', tasks: [], _active: true },
      { name: 'Vacation prep', tasks: [], _active: true },
      { name: 'Pay bills', tasks: [], _active: true }
    ];

    lists.forEach((list) => {
      masterWithLists.addList(list);
    });
  });

  it('create an instance of MasterList', () => {
    expect(master).to.be.an.instanceOf(MasterList);
  });

  it('should add a list to the master list', () => {
    expect(master.lists).to.have.lengthOf(0);
    master.addList(list);
    expect(master.lists).to.have.lengthOf(1);
    expect(master.lists).to.eql([{name: 'Chores', tasks: [], _active: true}]);
  });

  it('should delete a list from the lists array', () => {
    expect(masterWithLists.lists).to.have.lengthOf(3);
    masterWithLists.deleteList('Chores');
    expect(masterWithLists.lists).to.have.lengthOf(2);
    expect(masterWithLists.lists).to.eql([
      { name: 'Vacation prep', tasks: [], _active: true },
      { name: 'Pay bills', tasks: [], _active: true }
    ]);
  });

  it('should delete all lists from the lists array', () => {
    expect(masterWithLists.lists).to.have.lengthOf(3);
    masterWithLists.clearLists();
    expect(masterWithLists.lists).to.have.lengthOf(0);
  });
  
  it('should move a list from a source array to a desination array', () => {
    let activeList = new MasterList();
    let archivedList = new MasterList();

    activeList.lists = lists;
    archivedList.lists = [
      { name: 'Vacation prep', tasks: [], _active: true },
      { name: 'Pay bills', tasks: [], _active: true }
    ];

    expect(archivedList.lists).to.have.lengthOf(2);
    expect(activeList.lists).to.have.lengthOf(3);
    expect(archivedList.lists).to.not.include({ name: 'Chores', tasks: [], _active: true });
    MasterList.moveList(activeList, archivedList, 'Chores');
    expect(archivedList.lists).to.have.lengthOf(3);
    expect(activeList.lists).to.have.lengthOf(2);
    expect(archivedList.lists).to.include({ name: 'Chores', tasks: [], _active: true });
  });
});