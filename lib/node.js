'use strict';

const debug = require('debug')('lru-cache:node');

/**
 * @description single node for Doubly linked list
 */
class Node {
  /**
   * @description constructor
   * @param {String | Number} k - key
   * @param {String | Number} v - value
   * @return {void} void
   */
  constructor(k, v) {
    this.key = k || null;
    this.value = v || null;
    this.prev = null;
    this.next = null;
    this.hit = 0;

    this.isHead = false;
    this.isRear = false;
  }

  destroy() {
    if (this.isHead === true) {
      debug('the head node cannot be destroy');
      return false;
    }

    if (this.isRear === true) {
      debug('the rear node cannot be destroy');
      return false;
    }

    if (!this.prev || !this.next) {
      debug('it is a pointer node that cannot be destroy');
      return false;
    }
    const prev = this.prev;
    const next = this.next;

    prev.next = next;
    next.prev = prev;

    this.key = null;
    this.value = null;
    this.prev = null;
    this.next = null;
    this.hit = null;
    this.isHead = null;
    this.isRear = null;
  }
}

module.exports = Node;

