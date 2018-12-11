import { isPromise } from './tools';
import { noop } from './tasks/tasks';

export class Task {
  constructor(fn = noop) {
    this.$$fn = fn;
  }
  execute(...input) {
    try {
      const res = this.$$fn(...input);
      return isPromise(res) ? res : Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
