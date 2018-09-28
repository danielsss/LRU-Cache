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

  /**
   * @description destroy itself
   * @param {Number} ms - timeout threadholds
   * @return {Boolean}
   */
  destroy(ms) {
    if (!ms || isNaN(ms) || ms <= 0) {
      return false;
    }

    ms = ms > 0 && ms < 1000 ? 1000: ms;

    debug('destroy node: {"%s": "%s"} in %d', this.key, this.value, ms);
    setTimeout((function() {
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
    }).bind(this), ms);
  }
}

module.exports = Node;

