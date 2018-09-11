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
   * @description Initializer
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
   * @description Initializing head, rear, map and size
   * @return {void}
   */
  reset() {
    this.hash = new Hash();
    this.map = this.hash.map;
    this.size = 0;

    this[HEAD] = new Node(null, null);
    this[REAR] = new Node(null, null);
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
      if (this.capacity <= 0 || this.size >= this.capacity) {
        debug('this.capacity should not be 0 or list is full');
        return false;
      }
      const node = new Node(key, value);
      this[HEAD].next = node;
      this[REAR].prev = node;
      node.next = this[REAR];
      node.prev = this[HEAD];
      debug(this[HEAD].next === this[REAR].prev ? `only have one node for now` : `set cache failed`);
      this.size++;
      this.map.set(key, this[HEAD]);
    } else {
      this[ADD_FRONT](key, value);
    }
    return true;
  }


  /**
   * @description the lru cache length of doubly linked list
   * @return {number}
   */
  length() {
    let node = this[HEAD].next;
    if (node === null) return 0;
    let len = 0;

    while (true) {
      if (node.next === null) {
        break;
      }
      len++;
      node = node.next;
    }
    debug(`compute list length: ${len}`);
    return len;
  }

  /**
   * @description detect doubly-linked-list's state
   * @return {boolean}
   */
  isFull() {
    return this.size >= this.capacity;
  }

  /**
   * @description detect the doubly-linked-list's length
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
    const list = this.map.get(key);
    return list.next ? list.next.value : false;
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

    /*
    * for now, At least we have one node in doubly-linked-list
    * */
    const node = new Node(key, value);
    node.prev = this[HEAD];
    node.next = this[HEAD].next;
    this[HEAD].next.prev = node;
    this[HEAD].next = node;

    /*
    * The node touched doubly-linked-list capacity
    * Remove the last node & add front a new node
    * */
    if (this.isFull()) {
      debug('the doubly-linked-list is full, and then the rear will be removed');
      let _t = this[REAR].prev;
      this[REAR].prev = _t.prev;
      _t.prev = null;
      _t = null;
      return true;
    }

    this.size++;
    return true;
  }
}


module.exports = LRUCache;
