import { Observer } from '../src/observer.js';

describe('ObsObserverervable', () => {
  it('Should be defined', () => {
    expect(Observer).toBeDefined();
  });
  it('Should call the fn on next', () => {
    const fn = (input) => 1;
    expect(fn()).toBe(1);

    const observer = new Observer(fn);
    expect(observer._fn).toBe(fn);
    expect(observer.next).toBeDefined();
    expect(observer.next()).toBe(1);
  });
  it('Should call empty fn ', () => {
    const observer = new Observer();
    expect(observer.next()).toBe(undefined);
  });
});
