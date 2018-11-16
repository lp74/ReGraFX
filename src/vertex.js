import { Observable } from './observable.js';
import { Observer } from './observer.js';
import { Scheduler } from './scheduler.js';
import { Message } from './message.js';
import { Task } from './task.js';
export class Vertex {
  constructor(task = new Task(), scheduler = new Scheduler(), name = 'Vertex') {
    this.$$task = task;
    this.$$scheduler = scheduler;
    this.$$name = name;

    this.$$thenObservers = new Observable();
    this.$$catchObservers = new Observable();
    this.$$finallyObservers = new Observable();
    this.$$observable = new Observable();

    this.$$observer = new Observer(this.$$next.bind(this), this.$$name);
  }
  to(vertex) {
    this.$$thenObservers.subscribe(vertex.$$observer);
    return this;
  }
  err(vertex) {
    this.$$catchObservers.subscribe(vertex.$$observer);
    return this;
  }
  final(vertex) {
    this.$$finallyObservers.subscribe(vertex.$$observer);
    return this;
  }

  subscribe(fn) {
    this.$$observable.subscribe(new Observer(fn));
  }

  trigger(...input) {
    const msg = new Message();
    input.push(msg);
    this.$$observer.next(...input);
    return msg;
  }
  $$next(...input) {
    const msg = input[input.length - 1];
    if (!msg.token().$$cancelled) {
      this.$$scheduler.schedule()
        .then(() => {
          const promise = this.$$task.execute(...input);
          promise
            .then(out => {
              msg.sign(this.$$name);
              this.$$thenObservers.notify(out, msg);
            })
            .catch(err => {
              msg.sign(this.$$name);
              this.$$catchObservers.notify(err, msg);
            })
            .finally(() => {
              this.$$finallyObservers.notify(null, msg);
            });
          this.$$observable.notify(promise);
        });
    }
  }
}
