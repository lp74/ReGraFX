import { Token } from './token';

export class Message {
  constructor(origin) {
    this.$$origin = origin;
    this.$$date = Date.now();
    this.$$token = new Token();
    this.$$subject = null;
    this.$$signatures = [];
  }
  subject(subject) { this.$$subject = subject; return this; }
  sign(signature) { this.$$signatures.push(signature); return this; }
  token() {return this.$$token;}
}

Message.$$name = 'ReGraFX.Message';
