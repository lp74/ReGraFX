import { isPromise } from './tools.js';

export class Task {
  constructor(fn = () => null) {
    this._fn = fn;
  }
  execute(...input) {
    try {
      const res = this._fn(...input);
      return isPromise(res) ? res : Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
