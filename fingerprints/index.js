const Fingerprint2 = require('@fingerprintjs/fingerprintjs');

setTimeout(function () {
    Fingerprint2.get(function(result, components) {
      console.log(result) // a hash, representing your device fingerprint
      console.log(components) // an array of FP components
    })  
}, 500)