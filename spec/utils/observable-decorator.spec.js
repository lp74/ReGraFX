import { ObservableDecorator } from '../../src/utils/observable-decorator';
import { Observer } from '../../src/observer';

describe('ObservableWrapper', () => {
  it('Should wrap an object', () => {
    var foo = { bar: 1 };
    const wrapped = new ObservableDecorator(foo);
    expect(wrapped.$$obj.bar).toBe(1);
  });
  it('Should add observable property', () => {
    var foo = { bar: 1 };
    const wrapped = new ObservableDecorator(foo);

    foo.addObservableProperty('goofy');
    expect(foo.goofy).toEqual(undefined);

    let a;
    foo.subscribe(x => {a = x;});

    foo.goofy = 1;
    expect(foo.goofy).toEqual(1);
    expect(a).toEqual({ name: 'goofy', value: 1 });
  });
});
