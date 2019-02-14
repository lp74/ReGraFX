
const outputElem = document.getElementById('o1');

b1.addEventListener('click', function () {
  fetchNode.trigger(); // Trigger the node
});

// Fetch - Task
const fetchTask = new RGFX.Task(() => fetch('foa.json'));
const fetchNode = new RGFX.Vertex(fetchTask);

// Fetch response to json - Task
const jsonTask = new RGFX.Task(response => response.json());
const jsonNode = new RGFX.Vertex(jsonTask);

// Map - Task
const mapTask = new RGFX.Task(data => data * Math.random());
const mapNode = new RGFX.Vertex(mapTask);

// Repeat every 1 s - Task
const repeatTask = new RGFX.Task((() => { }));
const repeatNode = new RGFX.Vertex(repeatTask, new RGFX.Scheduler(1000));

// On error, retry 3 times every 500 ms,  - Task
const keeper = { count: 0 };
const retryTask = new RGFX.Task(
  err =>
    new Promise((resolve, reject) => {
      keeper.count++ > 2
        ? (() => { keeper.count = 0; reject(err); })()
        : resolve(err);
    })
);
const retryNode = new RGFX.Vertex(retryTask, new RGFX.Scheduler(500));

// After 3 errors, show a dialog
const errorDialogTask = new RGFX.Task(err => confirm(`An error occurred for more then 3 times:\n\n${err}\n\nWould you like to retry?`) ? Promise.resolve() : Promise.reject());
const errorDialogNode = new RGFX.Vertex(errorDialogTask);

// Build the Graph
fetchNode.to(jsonNode);
jsonNode.to(mapNode);
mapNode.to(repeatNode);

repeatNode.to(fetchNode);

fetchNode.err(retryNode);
jsonNode.err(retryNode);
retryNode.to(fetchNode);

retryNode.err(errorDialogNode);

errorDialogNode.to(fetchNode);

// Subscribe the mapNode
mapNode.subscribe(promise => promise.then(data => {
  outputElem.innerText = data.toFixed(2);
}));
