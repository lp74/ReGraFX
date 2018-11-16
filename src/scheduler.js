import { Observable } from './observable.js';

export class Scheduler {
  constructor(delay = 0, pauser = new Observable()) {
    this._delay = delay;
    this._pause = 0;
    this._pauser = pauser;
  }
  schedule() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isRunning()
          ? resolve()
          : this._pauser.subscribe(x => {
            this._pause = x;
            if (this.isRunning()) {resolve();}
          });
      }, this._delay);
    });
  }
  isRunning() {
    return !this._pause;
  }
}
