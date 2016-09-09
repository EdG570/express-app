import { expect } from 'chai';
import List from '../todos/List';

describe('List class', () => {
  let list, task, listWithTasks;

  beforeEach(() => {
    task = { description: 'Do homework', priority: 'High'};

    list = new List('Chores');

    listWithTasks = new List('Chores');

    const tasks = [
      { description: 'Buy lotion', priority: 'Low' },
      { description: 'Withdraw money from bank', priority: 'High' },
      { description: 'Buy swimsuit', priority: 'Medium' },
      { description: 'Go running', priority: 'Medium' },
      { description: 'Take the garbage out', priority: 'Low' }
    ];

    tasks.forEach((task) => {
      listWithTasks.addTask(task);
    });
  });

  it('should create a new List instance', () => { 
    expect(list).to.be.an.instanceOf(List); 
  });

  it('should update the list name', () => {  
    expect(list.name).to.equal('Chores');
    list.setName('Fun');
    expect(list.name).to.equal('Fun');   
  });

  it('should add a task to the list', () => { 
    expect(list.getTasks()).to.eql([]);
    list.addTask(task);
    expect(list.getTasks()).to.eql([task]);
  });

  it('should toggle active status property', () => {
    expect(list.active).to.equal(true);
    list.toggleActive();
    expect(list.active).to.equal(false);
  });
 
  it('should delete a specified task from the tasks array', () => {
    expect(listWithTasks.getTasks()).to.have.lengthOf(5);
    listWithTasks.deleteTask('Withdraw money from bank');
    expect(listWithTasks.getTasks()).to.have.lengthOf(4);
    expect(listWithTasks.getTasks()).to.eql([
      { description: 'Buy lotion', priority: 'Low' },
      { description: 'Buy swimsuit', priority: 'Medium' },
      { description: 'Go running', priority: 'Medium' },
      { description: 'Take the garbage out', priority: 'Low' }
    ]);
  });

  it('should return filtered tasks by priority', () => {
    let filteredTasks = [];
      
    expect(filteredTasks).to.have.lengthOf(0);
    filteredTasks = listWithTasks.filterTasks('Low');
    expect(filteredTasks).to.have.lengthOf(2);
    expect(filteredTasks).to.be.eql([
      { description: 'Buy lotion', priority: 'Low'},
      { description: 'Take the garbage out', priority: 'Low'}
    ]);
  });
});



