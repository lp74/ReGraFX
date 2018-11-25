const fetchComposite = new FetchComposite();

const outputElem = document.getElementById('o1');

let message;
b1.addEventListener('click', function () {
  if (message) {message.token().cancel();}
  message = fetchComposite.trigger(); // Trigger the node
});

// Subscribe the mapNode
fetchComposite.subscribe(promise => promise.then(data => {
  outputElem.innerText = data.toFixed(2);
}));
