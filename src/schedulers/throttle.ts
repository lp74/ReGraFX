import { AbstractScheduler} from '../abstract-scheduler'

export class Throttle extends AbstractScheduler {
  private $$timerId: any;
  constructor(delay: number = 0) {
    super(delay);
    this.$$timerId = null;
  }
  public schedule() {
    return new Promise<any>((resolve, reject) => {
      if (this.$$timerId) {
        reject();
      }
      else {
        this.$$timerId = setTimeout(() => {
          this.$$timerId = null;
        },
          this.$$delay);
        resolve();
      }
    });
  }
}
