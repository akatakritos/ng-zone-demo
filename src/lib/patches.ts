import { Pythagoras } from '../pythagoras/pythagoras';

(function(xhr: any) {
  var open = xhr.open;

  xhr.open = function() {
    var send = this.send;

    // replace send method
    this.send = function() {
      this.addEventListener('load', () => {
        Pythagoras.triggerDigest();
      });
      return send.apply(this, arguments);
    };

    return open.apply(this, arguments);
  };
})(XMLHttpRequest.prototype);
