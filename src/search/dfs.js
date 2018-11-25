export function dfs(vertex) {
  const visited = [];
  visit(vertex.$$observer);
  return visited;
  function visit(obs, d = 0, edge = 'origin') {
    const boundVertex = obs._fn.boundVertex;

    visited.push({ vertex: boundVertex, edge: edge, depth: d });

    for (const obr of boundVertex.$$thenObservers.observers().iterable()) {
      if (visited.map(x => x.vertex).indexOf(obr._fn.boundVertex) === -1) { visit(obr, d + 1, 'to'); }
    }
    for (const obr of boundVertex.$$catchObservers.observers().iterable()) {
      if (visited.map(x => x.vertex).indexOf(obr._fn.boundVertex) === -1) { visit(obr, d + 1, 'err'); }
    }
    for (const obr of boundVertex.$$finallyObservers.observers().iterable()) {
      if (visited.map(x => x.vertex).indexOf(obr._fn.boundVertex) === -1) { visit(obr, d + 1, 'final'); }
    }
  }
}

// TODO: use template method
export function dfsGraph(vertex) {
  const visited = [];
  const elements = [];
  visit(vertex.$$observer);
  return elements;
  function visit(obs, d = 0, edge = 'origin') {
    const boundVertex = obs._fn.boundVertex;
    visited.push({ vertex: boundVertex, edge: edge, depth: d });
    elements.push({ data: { id: boundVertex.$$name } });
    for (const obr of boundVertex.$$thenObservers.observers().iterable()) {
      if (visited.map(x => x.vertex).indexOf(obr._fn.boundVertex) === -1) {
        visit(obr, d + 1, 'to');
      }
      elements.push({ data: { id: (obs._fn.boundVertex.$$name + obr._fn.boundVertex.$$name), source: obs._fn.boundVertex.$$name, target: obr._fn.boundVertex.$$name } });
    }
    for (const obr of boundVertex.$$catchObservers.observers().iterable()) {
      if (visited.map(x => x.vertex).indexOf(obr._fn.boundVertex) === -1) {
        visit(obr, d + 1, 'err');
      }
      elements.push({ data: { id: (obs._fn.boundVertex.$$name + obr._fn.boundVertex.$$name), source: obs._fn.boundVertex.$$name, target: obr._fn.boundVertex.$$name }, style: { 'line-color': '#d90000', 'target-arrow-color': '#d90000', } });
    }
    for (const obr of boundVertex.$$finallyObservers.observers().iterable()) {
      if (visited.map(x => x.vertex).indexOf(obr._fn.boundVertex) === -1) {
        visit(obr, d + 1, 'final');
      }
      elements.push({ data: { id: (obs._fn.boundVertex.$$name + obr._fn.boundVertex.$$name), source: obs._fn.boundVertex.$$name, target: obr._fn.boundVertex.$$name } });
    }
  }
}
