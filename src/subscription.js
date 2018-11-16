export class Subscription {
  constructor(obj) {
    this.id = Symbol();
    this.unsubscribe = obj.unsubscribe.bind(obj, this.id);
  }
}