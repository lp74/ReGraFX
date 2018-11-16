export class Token {
  constructor() {
    this.$$symbol = Symbol();
    this.$$date = Date.now();
    this.$$cancelled = false;
  }
  cancel() {
    this.$$cancelled = true;
  }
}