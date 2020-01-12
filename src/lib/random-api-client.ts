import { Pythagoras } from '../pythagoras/pythagoras';

export class RandomApiClient {
  getRandomNumber(min: number, max: number): Promise<number> {
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
    return Pythagoras.http(url).then(body => Number(body));
  }
}
