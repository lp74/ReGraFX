import {Graph} from '../src/graph.js';
import {Vertex} from '../src/vertex.js';
import { Task } from '../src/task.js';

describe('Graph', () => {
  it('should be defined', () => {
    expect(Graph).toBeDefined();
  });

  it('should add and return a vertex', () => {
    const graph = new Graph();
    const vertex = graph.addVertex(1);
    expect(vertex instanceof Vertex).toBe(true);
  });

  it('should get a vertex by id', () => {
    const graph = new Graph();
    const vertex = graph.addVertex(1);
    expect(graph.vertex(1)).toBe(vertex);
  });

  it('should add a vertex identified by a Symbol()', () => {
    const graph = new Graph();
    const vertex = graph.addVertex(Symbol());
    expect(vertex instanceof Vertex).toBe(true);
  });

  it('should get a vertex by Symbol()', () => {
    const graph = new Graph();
    const id = Symbol('V1');
    const vertex = graph.addVertex(id);
    expect(graph.vertex(id)).toBe(vertex);
  });

  it('should not add a vertex with the same id', () => {
    const graph = new Graph();
    const addVertex1 = () => graph.addVertex(1);
    expect(addVertex1).not.toThrow();
    expect(addVertex1).toThrow();
  });

  it('should return its order', () => {
    const graph = new Graph();
    graph.addVertex(1);
    expect(graph.order()).toBe(1);
    graph.addVertex(2);
    expect(graph.order()).toBe(2);
  });
});
