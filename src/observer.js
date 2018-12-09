
export class Observer {
  constructor(fn = () => undefined) {
    this._fn = fn;
  }
  next(...input) {
    return this._fn(...input);
  }
}
