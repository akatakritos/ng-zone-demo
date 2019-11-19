import { Pythagoras } from './pythagoras/pythagoras';
import { RandomApiClient } from './lib/random-api-client';

class CounterComponent {
  api: RandomApiClient;

  constructor() {
    this.api = new RandomApiClient();
  }

  static template = `
    <div>
      <h1>{{ counter }}</h1>
      <button (click)="increment">+</button>
      <button (click)="decrement">-</button>
      <button (click)="setRandom">random</button>
    </div>
  `;

  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  async setRandom() {
    try {
      this.counter = await this.api.getRandomNumber(1, 100);
      Pythagoras.triggerDigest();
    } catch (error) {
      console.warn(error);
    }
  }
}

const root = document.getElementById('app');
const app = new Pythagoras(root, CounterComponent.template, new CounterComponent());

(window as any).app = app;
