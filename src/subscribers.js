import { Subscription } from './subscription.js';

export class Subscribers {
  constructor() {
    this._subscribers = {};
  }
  subscribe(obj) {
    const subscription = new Subscription(this);
    this._subscribers[subscription.id] = obj;
    return subscription;
  }
  unsubscribe(id) {
    delete this._subscribers[id];
  }
  size() {
    return this.ids().length;
  }
  ids() {
    return Object.getOwnPropertySymbols(this._subscribers);
  }
  get(id) {
    return this._subscribers[id];
  }
  set(obj) {
    this._subscribers[id] = obj;
  }
  iterable() {
    return Object.getOwnPropertySymbols(this._subscribers).map(s => this._subscribers[s]);
  }
}