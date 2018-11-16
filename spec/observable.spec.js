import { Observable } from '../src/observable.js';
import { Observer } from '../src/observer.js';

describe('Observable', () => {
  it('Should be defined', () => {
    expect(Observable).toBeDefined();
  });
  it('Should subscribe observers', () => {
    const observable = new Observable();
    expect(observable.observers().size()).toBe(0);

    const sub = observable.subscribe(() => 1);
    expect(observable.observers().size()).toBe(1);
  });
  it('Should unsubscribe observers', () => {
    const observable = new Observable();
    const fn = () => 1;
    const sub = observable.subscribe(fn);
    expect(observable.observers().size()).toBe(1);

    observable.unsubscribe(sub.id);
    expect(observable.observers().size()).toBe(0);
  });
  it('Should notify observers', () => {
    const observable = new Observable();
    let a = 0;
    const fn = () => { a++;};
    const sub = observable.subscribe(new Observer(fn));
    observable.notify();
    expect(a).toBe(1);

    observable.unsubscribe(sub.id);
    observable.notify();
    expect(a).toBe(1);
  });
  it('Should notify observers with many parameters', () => {
    const observable = new Observable();
    let max;
    const fn = (...params) => {max = Math.max(...params);};
    observable.subscribe(new Observer(fn));
    observable.notify(1, 2, 3, 4);
    expect(max).toBe(4);
  });
});
