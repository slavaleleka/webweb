/* browserstack testing */
(function () {
    'use strict';

    const browserstackRunner = require('browserstack-runner');

    const config = require('./browserstack.json');

    if (!process.env.TRAVIS) {
      // eslint-disable-next-line global-require
      require('dotenv').config();
    }

    config.username = process.env.BROWSERSTACK_USER;
    config.key = process.env.BROWSERSTACK_KEY; // limit each runner with 60 seconds
    // if not set defaults to 5 min (300 s)

    config.timeout = 60;
    browserstackRunner.run(config, error => {
      if (error) {
        throw error;
      }

      console.log('Test Finished');
    });

})();
