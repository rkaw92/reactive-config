'use strict';

const Config = require('../lib/Config');

// Create a template that provides default values:
const template = {
  http: {
    port: 80
  },
  debug: true
};

// Create an own config that overrides the defaults:
const myConfig = {
  debug: false
};

// Create an observable and subscribe to changes - one config object should
//  be produced on output, with the "debug" flag set to false.
const configObservable = Config(myConfig, template);
configObservable.subscribe(function(options) {
  console.log('--- CONFIG ---\n%o', options);
});
