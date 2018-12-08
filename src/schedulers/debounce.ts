import { AbstractScheduler} from '../abstract-scheduler'

export class Debounce extends AbstractScheduler{
  private $$timerId: any;
  constructor(delay: number = 0) {
    super(delay);
    this.$$timerId = null;
  }
  public schedule() : Promise<any>{
    return new Promise<any>( resolve  => {
      if (this.$$timerId) {
        clearTimeout(this.$$timerId);
      }
      this.$$timerId = setTimeout(() => {
        this.$$timerId = null;
        resolve();
      }, this.$$delay);
    });
  }
}
