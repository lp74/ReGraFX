import { Subscribers } from '../src/subscribers';

describe('Subscribers', () => {
  it('Should be defined', () => {
    expect(Subscribers).toBeDefined();
  });
  it('Should subscribe obj', () => {
    const register = new Subscribers();
    expect(register.size()).toBe(0);
    register.subscribe(() => 1);
    expect(register.size()).toBe(1);
  });
  it('Should unsubscribe obj', () => {
    const register = new Subscribers();
    const fn = () => 1;
    const subscription = register.subscribe(fn);
    expect(register.size()).toBe(1);
    expect(register.get(subscription.id)).toBe(fn);

    subscription.unsubscribe();
    expect(register.size()).toBe(0);
  });
  it('Should be itarable', () => {
    const register = new Subscribers();
    const subscription1 = register.subscribe(1);
    const subscription2 = register.subscribe(2);
    expect(register.size()).toBe(2);
    let c = 0;
    for (const subscriber of register.iterable()) {
      expect(subscriber).toBe(++c);
    }
  });
});
