'use strict';

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
  constructor(k = null, v = null) {
    this.key = k;
    this.value = v;
    this.prev = null;
    this.next = null;
    this.hit = 0;
  }
}

module.exports = Node;

