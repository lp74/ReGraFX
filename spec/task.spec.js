import {Task} from '../src/task.js';

describe('Task', () => {
  it('should return a function that return a promise if the task is not a promise', done => {
    const fn = x => 1;
    new Task(fn).execute().then(output => {
      expect(output).toBe(1);
      done();
    });
  });

  it('should return the fn if it is a promise', done => {
    const fn = x => new Promise(resolve => resolve(2));
    new Task(fn).execute().then(output => {
      expect(output).toBe(2);
      done();
    });
  });

  it('should return the fn if it is a fetch', done => {
    const fn = x => fetch('foo');
    new Task(fn).execute().then(output => {
      expect(output instanceof Response).toBe(true);
      done();
    });
  });
});
