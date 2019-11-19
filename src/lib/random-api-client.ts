export class RandomApiClient {
  getRandomNumber(min: number, max: number): Promise<number> {
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.addEventListener('load', function() {
        if (this.status === 200) {
          const body = this.response;
          resolve(Number(body));
        }
      });

      request.addEventListener('error', reject);

      request.send();
    });
  }
}
