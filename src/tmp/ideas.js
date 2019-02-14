export function trace(vertex) {
  const t = dfs(vertex);
  let d = -1;
  let str = '\n\nGraph\n\n';
  for (const v of t) {
    const back = (d - v.depth);
    if (v.depth <= d) {str += '\n' + ' '.repeat(8 * v.depth) + ' \└' + linkString(v.edge);}
    if (v.depth > d) {str += ' -' + linkString(v.edge) ;}
    d = v.depth;
  }
  str += '\n\n';
  console.log(str);
}

function linkString(type) {
  return (type === 'err') ? '┄┄┄> X' : '───> X';
}
