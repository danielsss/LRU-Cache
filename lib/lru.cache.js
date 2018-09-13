'use strict';

const debug = require('debug')('lru-cache:');
const Hash = require('./hash');
const DoublyLinkedList = require('./list');
const assert = require('assert');

const defaultOpts = {
  capacity: 1000,
  maxAge: 0,
};

/**
 * @description LRU Cache's Implementation
 */
class LRUCache {
  /**
   * @description Initializer
   * @param {Object} options
   *  - options.capacity - the doubly linked list's limitation
   * @return {void}
   */
  constructor(options = {}) {
    if (options.capacity === 0) {
      assert('options.capacity can not be 0');
    }
    this.options = Object.assign({}, defaultOpts, options);
    this.capacity = this.options.capacity;
    this.hash = new Hash();
    this.map = this.hash.map;
  }

  /**
   * @description find an value from lru cache by key
   * @param {String} key - cache key
   * @return {String | Boolean} value
   */
  get(key) {
    if (!this.authKey(key)) return false;

    const list = this.map.get(key);
    return list.get();
  }

  /**
   * @description Set a cache to lru cache
   * @param {String} key - cache key
   * @param {String} value - cache value
   * @return {boolean}
   */
  set(key, value) {
    if (!this.isValid(key) || !this.isValid(value)) {
      debug('the key/value must be an valid string or number');
      return false;
    }

    if (this.map.has(key)) {
      const list = this.map.get(key);
      return list.set(key, value);
    }

    const list = new DoublyLinkedList(this.options);
    this.map.set(key, list);
    return list.set(key, value);
  }

  /**
   * @description get front node times of hit
   * @param {String} key
   * @return {Number}
   */
  hit(key) {
    if (!this.authKey(key)) return 0;
    const list = this.map.get(key);
    return list.hit();
  }

  /**
   * @description Authentication the is valid string
   * @param {String} key
   * @return {boolean}
   */
  authKey(key) {
    if (!this.isValid(key)) {
      debug(`An invalid key:${key}`);
      return false;
    }

    if (!this.map.has(key) || this.isMapEmpty()) {
      debug(`Not found doubly linked list by key:${key}`);
      return false;
    }

    return true;
  }


  /**
   * @description detect the map's length
   * @return {boolean}
   */
  isMapEmpty() {
    return this.map.size === 0;
  }

  /**
   * @description detect v is an valid string or number
   * @param {String | Number} v - a string for detection
   * @return {boolean}
   */
  isValid(v) {
    return v !== null && v !== undefined;
  }

  /**
   * @description convert all list values to array
   * @param {String} key
   * @return {Array}
   */
  toArray(key) {
    if (!this.authKey(key)) return [];

    const list = this.map.get(key);
    return list.toArray();
  }
}


module.exports = LRUCache;
