'use strict';

const Observable = require('rxjs/Rx').Observable;

function applyTemplate(config, template) {
  // Merge the config values into the template.
  function _deepMerge(target, source) {
    // Return primitives as-is:
    if (typeof source !== 'object' || !source) {
      return source;
    }
    // Special case: copy Date objects:
    if (Object.prototype.toString.call(source) === '[object Date]') {
      return new Date(source);
    }
    // Overlay keys from source to target, initializing it as {}:
    //TODO: Copy arrays, too!
    const newTargetValues = {};
    Object.keys(source).forEach(function _overlayKey(key) {
      newTargetValues[key] = _deepMerge(target[key] || {}, source[key]);
    });
    return Object.assign({}, target, newTargetValues);
  }

  return _deepMerge(template, config);
}

function isObservable(object) {
  return (typeof object === 'object' && object && typeof object.subscribe === 'function');
}

/**
 * Create a Config object (can be called without "new").
 * A Config is an Observable of some configuration options which can be
 *  updated on the fly. It ensures the options are immutable (frozen), and that
 *  they take defaults from a "template object".
 */
function Config(source, template) {
  const sourceObservable = isObservable(source) ? Observable.from(source) : Observable.of(source);
  return sourceObservable.map(function(config) {
    return applyTemplate(config, template);
  });
}

module.exports = Config;
