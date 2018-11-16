
export class Observer {
  constructor(fn = () => undefined, name = 'Linked Observer') {
    this._fn = fn;
    this._name = name;
  }
  next(...input) {
    return this._fn(...input);
  }
}
