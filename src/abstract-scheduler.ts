export abstract class AbstractScheduler{
  protected $$delay: number;
  constructor(delay: number = 0){
    this.$$delay = delay;
  }
  protected abstract schedule() : Promise<any>;
}

export interface IPausable{
  isRunning(): boolean;
}
