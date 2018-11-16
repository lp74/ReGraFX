import { Vertex } from './vertex.js';
import { Subscribers } from './subscribers.js';
import { Task } from './task.js';
import { Scheduler } from './scheduler.js';

export class Graph {
  constructor() {
    this.$$vertices = {};
  }
  addVertex(id, task = new Task(), scheduler = new Scheduler()) {
    if (this.$$vertices[id]) {throw new Error('Duplicated vertex entry');}
    this.$$vertices[id] = new Vertex(task, scheduler, id);
    return this.$$vertices[id];
  }
  order() { return Object.keys(this.$$vertices).length +  Object.getOwnPropertySymbols(this.$$vertices).length; }
  vertex(id) { return this.$$vertices[id]; }
}