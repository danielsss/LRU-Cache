'use strict';

const Node = require('./node');
const debug = require('debug')('lru-cache:list');
const assert = require('assert');

/**
 * @description Doubly linked list
 */
class DoublyLinkedList {
  /**
   * @description Initialize constructor
   * @param {Object} options
   */
  constructor(options = {}) {
    if (options.capacity) {
      debug('capacity should be > 0');
      assert('capacity should be > 0');
    }
    this.head = new Node(null, null);
    this.rear = new Node(null, null);
    this.head.isHead = true;
    this.rear.isRear = true;

    this.capacity = options.capacity || 1000;
    this.maxAge = options.maxAge || 0;
    this.size = 0;
  }

  /**
   * @description get value from front of list
   * @return {String}
   */
  get() {
    if (this.size === 0) return null;
    const front = this.head.next;
    front.hit++;
    return front.value;
  }

  /**
   * @description Set a cache to list
   * @param {String} key - cache key
   * @param {String} value - cache value
   * @return {boolean}
   */
  set(key, value) {
    if (!this.isValid(value)) {
      debug(`invalid value: ${value}`);
      return false;
    }

    this.front(key, value);
    if (this.size > this.capacity) {
      return this.pop();
    }
    return true;
  }

  /**
   * @description pop from list rear
   * @return {Boolean}
   */
  pop() {
    let node = this.rear.prev;

    /* handle last node */
    if (node.prev === this.head) {
      debug('only one node we have');
      node.prev = null;
      node.next = null;
      this.reset();
      return true;
    }

    this.rear.prev = node.prev;
    node.prev.next = this.rear;
    node.next = null;
    node.prev = null;
    node = null;

    this.size--;
    return true;
  }


  /**
   * @description set an value to front of the doubly linked list
   * @param {String} key - an string key
   * @param {any} value - string | number
   * @return {Boolean}
   */
  front(key, value) {
    const node = new Node(key, value);

    /* it will set a timer for auto-destory */
    if (this.maxAge > 0) {
      debug('list.front maxAge -> ', this.maxAge);
      const timerId = setTimeout(() => {
        node.destroy();
        timerId && clearTimeout(timerId);
      }, this.maxAge);
    }

    if (this.size === 0) {
      /* we haven't anything for now */
      node.next = this.rear;
      this.rear.prev = node;
      node.prev = this.head;
      this.head.next = node;
      this.size++;
      return true;
    }

    /* At least we have one node on the list */
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
    return true;
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
   * @description reset size head, rear
   * @return {Boolean}
   */
  reset() {
    if (this.head.next) {
      this.head.prev = null;
      this.head.next = null;
    }
    if (this.rear.prev) {
      this.rear.prev = null;
      this.rear.next = null;
    }

    this.size = 0;
    return true;
  }

  /**
   * @description convert all value to array
   * @return {Array}
   */
  toArray() {
    if (this.size === 0) {
      return [];
    }
    const arr = [];

    let node = this.head.next;
    while (true) {
      if (node.next === this.rear) {
        arr.push(node.value);
        break;
      }
      arr.push(node.value);
      node = node.next;
    }
    debug('convert all value to array =', arr);
    return arr;
  }

  /**
   * @description The front node times of hit
   * @return {Number} default: 0
   */
  hit() {
    if (this.size === 0) {
      return 0;
    }

    const front = this.head.next;
    return front.hit;
  }

  /**
   * @description Clean the list
   * @return {boolean}
   */
  clean() {
    if (this.size === 0) {
      debug('clean -> empty list');
      return false;
    }
    while (this.size !== 0) {
      /* the pop method will do reduce size property */
      this.pop();
    }

    this.reset();
    return true;
  }
}

module.exports = DoublyLinkedList;
