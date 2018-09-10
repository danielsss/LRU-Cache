'use strict';

const debug = require('debug')('lru-cache:');

const Node = require('./lib/node');
const Hash = require('./lib/hash');

const defaultOpts = {
  capacity: 1000,
  maxAge: 0,
};

const ADD_FRONT = Symbol('_add_front');
const HEAD = Symbol('_head');
const REAR = Symbol('_rear');
const GET_FRONT = Symbol('_get_front');

/**
 * @description LRU Cache's Implementation
 */
class LRUCache {
  /**
   * @description Initialized constructor
   * @param {Object} options
   *  - options.capacity - the doubly linked list's limitation
   * @return {void}
   */
  constructor(options = {}) {
    options = Object.assign({}, defaultOpts, options);
    this.capacity = options.capacity;
    this.reset();
  }

  /**
   * @description Initialize head, rear, map and size
   */
  reset() {
    this.hash = new Hash();
    this.map = this.hash.map;
    this.size = 0;

    this[HEAD] = null;
    this[REAR] = null;
  }

  /**
   * @description find an value from lru cache by key
   * @param {String} key - cache key
   * @return {String|Boolean} value
   */
  get(key) {
    /* empty map */
    if (this.isMapEmpty()) {
      debug('LRU-Cache is empty');
      return false;
    }

    /* check key*/
    if (!this.isValid(key)) {
      debug(`An invalid key:${key}`);
      return false;
    }
    if (!this.map.has(key) || this.isMapEmpty()) {
      debug(`Not found doubly linked list by key:${key}`);
      return false;
    }

    return this[GET_FRONT](key);
  }

  /**
   * @description Set a cache to lru cache
   * @param {String} key - cache key
   * @param {String} value - cache value
   * @return {boolean}
   */
  set(key = null, value = null) {
    if (!this.isValid(key) || !this.isValid(value)) {
      debug('the key/value must be an valid string or number');
      return false;
    }

    if (this.isEmpty()) {
      if (this.capacity <= 0 || this.count >= this.capacity) {
        debug('this.capacity should not be 0 or list is full');
        return false;
      }
      const node = new Node(key, value);
      this[HEAD] = node;
      this[REAR] = node;
      this[HEAD].next = this[REAR];
      this[REAR].prev = this[HEAD];
      debug(this[HEAD] === this[REAR] ? `only have one node for now` : `set cache failed`);
      this.map.set(key, this[HEAD]);
    } else {
      this[ADD_FRONT](key, value);
    }


    this.size++;
    return true;
  }

  /**
   * @description detect the doubly linked list's length
   * @return {boolean}
   */
  isEmpty() {
    return this.size === 0;
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


  /* All the private methods */

  /**
   * @description get an value from front of the doubly linked list
   * @param {String} key - an string key
   * @return {String}
   */
  [GET_FRONT](key) {
    if (!this.isValid(key)) {
      debug(`get_front -> an invalid key:${key}`);
      return false;
    }
    return this.map.get(key).value;
  }

  /**
   * @description set an value to front of the doubly linked list
   * @param {String} key - an string key
   * @param {any} value - string | number
   * @return {String}
   */
  [ADD_FRONT](key, value) {
    if (!this.isValid(key)) {
      debug(`add_front -> an invalid key:${key}`);
      return false;
    }
    const node = new Node(key, value);
    node.prev = this[HEAD];
    this[HEAD] = node;
    return true;
  }
}


module.exports = LRUCache;
