const outputElem = document.getElementById('o1');
const n1 = new RGFX.Vertex(new RGFX.Task(console.log), new RGFX.Throttle(500));
const n2 = new RGFX.Vertex(new RGFX.Task(console.log), new RGFX.Debounce(500));
b1.addEventListener('click', evt => {
  n1.trigger(evt);
});
b2.addEventListener('click', evt => {
  n2.trigger(evt);
});

i1.addEventListener('input', evt => {
  n1.trigger(evt.target.value);
});

i2.addEventListener('input', evt => {
  n2.trigger(evt.target.value);
});
