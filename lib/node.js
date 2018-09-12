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
    // this.isHead = false;
    // this.isRear = false;
  }

  // destroy(maxAge = 1e3 * 86400000) {
  //   if (this.isHead || this.isRear) return false;
  //   const next = this.next;
  //   const prev = this.prev;
  // }
}

module.exports = Node;

