import {Vertex} from '../../src/vertex.js';
import {Task} from '../../src/task.js';
import {dfs, trace} from '../../src/search/dfs.js';
describe('Search', () => {
  it('dfs', () => {
    const v1 = new Vertex(new Task(x => x), undefined, 'task1');
    const v1_1 = new Vertex(new Task(x => x), undefined, 'task1.1');
    const v1_2 = new Vertex(new Task(x => x), undefined, 'task1.2');
    v1.to(v1_1);
    v1.to(v1_2);
    expect(dfs(v1).map(x => x.vertex)).toEqual([v1, v1_1, v1_2]);
  });
  it('dfs', () => {
    const v1 = new Vertex(new Task(x => x), undefined, 'task1');
    const v2 = new Vertex(new Task(x => x), undefined, 'task2');
    const v3 = new Vertex(new Task(x => x), undefined, 'task3');
    v1.to(v2);
    v2.to(v3);
    expect(dfs(v1).map(x => x.vertex)).toEqual([v1, v2, v3]);
  });
  it('dfs', () => {
    const v1 = new Vertex(new Task(x => x), undefined, 'task1');
    const v2 = new Vertex(new Task(x => x), undefined, 'task2');
    const v3 = new Vertex(new Task(x => x), undefined, 'task3');
    v1.to(v2);
    v1.err(v3);
    expect(dfs(v1).map(x => x.vertex)).toEqual([v1, v2, v3]);
  });
});