import { Pythagoras } from './pythagoras/pythagoras';

console.log('hello world');

class CounterComponent {
  static template = `
    <div>
      <h1>{{ counter }}</h1>
      <button (click)="increment">+</button>
      <button (click)="decrement">-</button>
    </div>
  `;

  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}

const root = document.getElementById('app');
const app = new Pythagoras(root, CounterComponent.template, new CounterComponent());

(window as any).app = app;
