import {Subscribers} from './subscribers.js';

export class Observable {
  constructor(subscribers = new Subscribers() ) {
    this.$$observers = subscribers;
  }
  subscribe(observer) {
    return this.observers().subscribe(observer);
  }
  observers() {
    return this.$$observers;
  }
  unsubscribe(id) {
    this.observers().unsubscribe(id);
  }
  notify(...obj) {
    for (const observer of this.observers().iterable()) {
      observer.next(...obj);
    }
  }
}
