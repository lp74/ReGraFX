import { Vertex } from '../src/vertex';
import { Task } from '../src/task.js';
import { Scheduler } from '../src/schedulers/scheduler';

describe('Vertex', () => {
  it('should call task execute', done => {
    const fn = x => 1;
    const vs = new Vertex(new Task(fn));
    expect(vs.$$task).toBeDefined();
    vs.$$task.execute().then(output => {
      expect(output).toBe(1);
      done();
    });
  });

  it('should call observer next with arguments', () => {
    const vs = new Vertex(new Task());
    const spy1 = spyOn(vs, 'trigger');
    vs.trigger(1, 2, 3);
    expect(spy1).toHaveBeenCalledWith(1, 2, 3);
  });

  it('should call observer next with arguments', () => {
    const vs = new Vertex(new Task());
    const spy1 = spyOn(vs.$$observer, 'next');
    vs.trigger(1, 2, 3);
    expect(spy1).toHaveBeenCalledWith(1, 2, 3, jasmine.anything());
  });

  it('should call task execute 1 ', () => {
    const fn = x => 1;
    const task = new Task(fn);
    const vs = new Vertex(task);
    const spy = spyOn(vs, 'trigger');
    vs.trigger();
    expect(spy).toHaveBeenCalled();
  });

  it('should call task execute 2', done => {
    const fn = x => 1;
    const task = new Task(fn);
    const vs1 = new Vertex(task, new Scheduler(0), 'V1');
    const vs2 = new Vertex(task, new Scheduler(100), 'V2');
    vs1.to(vs2);
    expect(vs1.$$thenObservers.observers().size()).toBe(1);
    vs2.subscribe(result => {
      done();
    });
    vs1.trigger(0);
  });

  it('should log the message', (done) => {
    const store = [];
    const pushFn = (input, opt) => {
      store.push({ input, opt });
    };
    const vs1 = new Vertex(new Task(() => Math.random().toFixed(2)));
    const vs2 = new Vertex(new Task(pushFn));
    vs1.to(vs2);
    let count = 0;
    vs2.subscribe(p => {
      count++;
      if (count >= 2) {
        expect(store.length).toBe(2);
        done();
      }
    });
    vs1.trigger(undefined, 1);
    vs1.trigger(undefined, 2);
  });

  it('should cancel', (done) => {
    const longFn = () => new Promise((resolve, reject) => { setTimeout(resolve, 100); });
    const vs1 = new Vertex(new Task(longFn));
    const vs2 = new Vertex(new Task(() => 2));
    const vs3 = new Vertex(new Task(() => 3));

    vs1.to(vs2);
    vs2.to(vs3);
    const msg = vs1.trigger();
    msg.token().cancel();

    const spy = spyOn(vs3.$$observer, 'next');
    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled();
      done();
    }, 200);
  });
  it('should cancel', (done) => {
    const vs1 = new Vertex(new Task(() => 2), undefined, 'A');
    const vs2 = new Vertex(new Task(() => 2), undefined, 'B');
    const vs3 = new Vertex(new Task(() => 3), undefined, 'C');

    vs1.to(vs2);
    vs2.to(vs3);

    const msg = vs1.trigger();

    vs3.subscribe(p => {
      expect(msg.$$signatures).toEqual(['A', 'B']);
      done();
    }
    );
  });
});
