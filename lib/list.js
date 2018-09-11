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

    this.capacity = options.capacity || 1000;
    this.size = 0;
  }

  /**
   * @description get value from front of list
   * @return {String}
   */
  get() {
    if (this.size === 0) return null;
    return this.head.next.value;
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
    if (this.size === 0) {
      /* we haven't anything for now */
      const node = new Node(key, value);
      node.next = this.rear;
      this.rear.prev = node;
      node.prev = this.head;
      this.head.next = node;
      this.size++;
      return true;
    }

    /* At least we have one node on the list */
    const node = new Node(key, value);
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

  /*
  * @description clear list
  *
  * */
  // clear() {
  //   if (this.size === 0) return false;
  //   //TODO: clear full list
  // }
}

module.exports = DoublyLinkedList;
