import { AbstractScheduler } from '../abstract-scheduler';
import { IPausable } from '../abstract-scheduler';
import { Observable } from '../observable';

export class Scheduler extends AbstractScheduler implements IPausable {
  private $$pause: boolean;
  private $$pauser: Observable;
  constructor(delay: number = 0, pauser: Observable = new Observable()) {
    super(delay);
    this.$$pause = false;
    this.$$pauser = pauser;
  }
  schedule() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.isRunning()
          ? resolve()
          : this.$$pauser.subscribe((pause: boolean) => {
            this.$$pause = pause;
            if (this.isRunning()) { resolve(); }
          });
      }, this.$$delay);
    });
  }
  isRunning() {
    return !this.$$pause;
  }
}
