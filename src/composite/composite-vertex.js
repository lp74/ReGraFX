export class CompositeVertex {
  constructor() {
  }
  to(vertex) {return this.output.to(vertex);}
  err(vertex) {return this.output.err(vertex);}
  final(vertex) {return this.output.final(vertex);}
  subscribe(fn) {return this.output.subscribe(fn);}
  trigger(...input) {return this.input.trigger(...input);}
  input(vertex) {this.input = vertex;}
  output(vertex) {this.output = vertex;}
  $observer() {return this.input.$observer();}
}
