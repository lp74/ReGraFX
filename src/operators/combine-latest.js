import { Task } from '../task';

export class CombineLatest extends Task {
  constructor(...vertices) {
    super();
    this.$$fn = this.fn;
    this.$$vertices = vertices.map(v => v.$$id);
    this.$$combined = [];
    this.$$length = this.$$vertices.length;
    this.$$sum = 0;
    this.$$expectSum = this.$$length * (this.$$length + 1) / 2;
  }

  fn(input, message) {
    const id = message.lastSigner();
    const index = this.$$vertices.indexOf(id);
    if (index !== -1) {
      if (this.$$sum < this.$$expectSum) { this.$$sum += (index + 1); }
      this.$$combined[index] = input;
    }
    return (this.$$sum === this.$$expectSum) ?
      Promise.resolve(this.$$combined)
      :
      Promise.reject(this.$$combined);
  }
}
