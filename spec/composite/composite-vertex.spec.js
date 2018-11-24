import { CompositeVertex } from '../../src/composite/composite-vertex.js';
import { Vertex } from '../../src/vertex.js';
import { Task } from '../../src/task.js';

describe('Composite Vertex', () => {
  it('should be defined', () => {
    expect(CompositeVertex).toBeDefined();
  });
  it('should throw if methods aren\'t defined', () => {
    const composite = new CompositeVertex();
    expect(composite.to).toThrow();
    expect(composite.err).toThrow();
    expect(composite.final).toThrow();
    expect(composite.subscribe).toThrow();
    expect(composite.trigger).toThrow();
  });
  it('should be extended - to case', (done) => {
    class MyComposite extends CompositeVertex {
      constructor(params) {
        super();
        this.input = new Vertex(new Task((x, y, z) => z));
        this.output = new Vertex(new Task(y => params * y));
        this.input.to(this.output);
      }
    }
    const myCompositeObject = new MyComposite(2);
    expect(myCompositeObject instanceof CompositeVertex).toBeTruthy();

    myCompositeObject.subscribe(p => p.then(result => {
      expect(result).toBe(6);
      done();
    }));
    myCompositeObject.trigger(1, 2, 3);
  });
  it('should be extended - err case', (done) => {
    class MyComposite extends CompositeVertex {
      constructor(params) {
        super();
        this.input = new Vertex(new Task((x => x)));
        this.output = new Vertex(new Task(x => Promise.reject(x)));
        this.input.to(this.output);
      }
    }
    const myCompositeObject = new MyComposite();
    expect(myCompositeObject instanceof CompositeVertex).toBeTruthy();

    myCompositeObject.subscribe(p => p.catch(result => {
      expect(result).toBe(1);
      done();
    }));
    myCompositeObject.trigger(1);
  });
});
