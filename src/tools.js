export function isFunction(value) {
  return typeof value === 'function' || false;
}

export function isPromise(p) {
  return p && isFunction(p.then);
}

export function isMessage(obj) {
  return (obj && obj.$$name && obj.$$name === 'ReGraFX.Message');
}
