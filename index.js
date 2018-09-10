'use strict';

const assert = require('assert');
const _ = require('lodash');
const debug = require('debug')('lru-cache');

const Node = require('./lib/node');
const Hash = require('./lib/hash');

const defaultOpts = {
  capacity: 1000,
  maxAge: 0
};

const ADD_FRONT = Symbol('_add_front');
const HEAD = Symbol('_head');
const REAR = Symbol('_rear');

class LRUCache {
  constructor (options = {}) {
    options = Object.assign({}, defaultOpts, options);
    this.capacity = options.capacity;
    this.reset();
  }


  reset() {
    this.hash = new Hash();
    this.map = this.hash.map;
    this.count = 0;

    this[HEAD] = null;
    this[REAR] = null;
  }

  get(key) {
    /* empty map */
    if (this.isMapEmpty()) return false;

    /* check key*/
    if (!this.isValid(key)) return false;
    if (!this.map.has(key)) return false;

  }

  set(key = null, value = null) {
    if (!this.isValid(key) || !this.isValid(value)) {
      debug('the key/value must be an valid string or number');
      return false;
    }

    const node = new Node(key, value);

    if (this.isListEmpty()) {
      if (this.capacity <= 0 || this.count >= this.capacity) {
        debug('this.capacity should not be 0 or list is full');
        return false;
      }
      this[HEAD] = node;
      this[REAR] = node;
    } else {
      this[ADD_FRONT](node);
    }

    this.count++;
    return true;
  }

  [ADD_FRONT](node) {
    
  }

  isListEmpty() {
    return this.head.next === this.tail.prev;
  }

  isMapEmpty() {
    return this.map.size === 0;
  }

  isValid(v) {
    return v !== null && v !== undefined;
  }
}


module.exports = LRUCache;
