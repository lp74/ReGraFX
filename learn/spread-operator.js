const task = (x) => {
  console.log(x);
};

function executor(...input) {
  task(...input);
}

executor(1);

class Message {
  constructor(obj) {
    this.$$obj = obj;
  }
  get() {return this.$$obj;}
}
function executor2(...input) {
  const msg = new Message(input);
  task(...msg.get());
}

executor2(1);