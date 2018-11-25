import { RGFX } from '../src/regrafx.es6';

import { fetchMock } from 'fetch-mock';
import { Graph } from '../src/graph';

describe('Fetch Foo', () => {
  it('RGFX', () => {
    expect(new RGFX.Vertex()).toBeDefined();
    expect(new RGFX.Task()).toBeDefined();
    expect(new RGFX.Scheduler()).toBeDefined();
  });

  it('Test setup', () => {
    expect(RGFX.Vertex).toBeDefined();
  });

  let fetchTask; let jsonTask; let mapTask; let repeatTask; let retryTask; let errorDialogTask;
  let fetchNode; let jsonNode; let mapNode; let repeatNode; let retryNode; let errorDialogNode;

  function mock() {
    fetchMock.reset();
    fetchMock.mock(/.*foo/, {
      status: 200,
      body: { x: 1 }
    });
  }

  beforeEach(() => {
    mock();

    const graph = new Graph();

    fetchTask = new RGFX.Task(() => fetch('foo'));
    jsonTask = new RGFX.Task(data => data.json());
    mapTask = new RGFX.Task(data => {
      data.x *= 2;
      return data;
    });
    repeatTask = new RGFX.Task();
    const keeper = { count: 0 };
    retryTask = new RGFX.Task(
      err =>
        new Promise((resolve, reject) => {
          keeper.count++ > 2 ?
            (() => { keeper.count = 0; reject(err); })()
            : resolve(err);
        })
    );
    errorDialogTask = new RGFX.Task(err => console.err(err));

    fetchNode = graph.addVertex(1, fetchTask);
    jsonNode = graph.addVertex(2, jsonTask);
    mapNode = graph.addVertex(3, mapTask);
    repeatNode = graph.addVertex(4, repeatTask, new RGFX.Scheduler(50));
    retryNode = graph.addVertex(5, retryTask, new RGFX.Scheduler(100));
    errorDialogNode = graph.addVertex(6, errorDialogTask);

    fetchNode.to(jsonNode);
    jsonNode.to(mapNode);
    mapNode.to(repeatNode);
    retryNode.to(fetchNode);

    fetchNode.err(retryNode);
    jsonNode.err(retryNode);
    retryNode.err(errorDialogNode);

    mapNode.subscribe(x => x);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('Node 1 Should Fetch', done => {
    fetchNode.subscribe(() => {
      done();
    });
    fetchNode.trigger();
  });

  it('Node 2 Should JSon', done => {
    jsonNode.subscribe(json => {
      json.then(data => {
        expect(data).toEqual({ x: 1 });
        done();
      });
    });
    fetchNode.trigger();
  });

  it('Node 3 Should double', done => {
    mapNode.subscribe(json => {
      json.then(data => {
        expect(data).toEqual({ x: 2 });
        done();
      });
    });
    fetchNode.trigger();
  });

  it('Node 4 Should delay', done => {
    repeatNode.subscribe(() => {
      done();
    });
    fetchNode.trigger();
  });

  it('Node 5 Should delay on Fetch Error', done => {
    fetchMock.reset();
    retryNode.subscribe(() => {
      done();
    });
    fetchNode.trigger();
  });

  it('Node 5 Should delay on JSon Error', done => {
    fetchMock.reset();
    fetchMock.mock(/.*foo/, {
      status: 200
    });
    retryNode.subscribe(() => {
      done();
    });
    fetchNode.trigger();
  });

  it('Node 6 Should observe after 3 errors', done => {
    fetchMock.reset();
    errorDialogNode.subscribe(() => {
      done();
    });
    fetchNode.trigger();
  });
});
