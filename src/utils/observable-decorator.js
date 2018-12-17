import { Observable } from '../observable';
import { Observer } from '../observer';

export class ObservableDecorator {
  constructor(obj) {
    this.$$obj = obj;
    this.$$obj.$$observers = new Observable();
    this.$$observedProperties = {};
    this.$$obj.subscribe = fn => this.subscribe(fn);
    this.$$obj.addObservableProperty = propertyName => this.addObservableProperty(propertyName);
  }
  addObservableProperty(propertyName) {
    var $$prop = {
      name: propertyName,
      value: undefined
    };
    Object.defineProperty(this.$$obj, propertyName, {
      get() {return $$prop.value;},
      set(value) {
        $$prop.value = value;
        this.$$observers.notify($$prop);
      }
    });
  }
  subscribe(fn) {
    return this.$$obj.$$observers.subscribe(new Observer(fn));
  }
}
