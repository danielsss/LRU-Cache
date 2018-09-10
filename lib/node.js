'use strict';

const assert = require('assert');


class Node {
  constructor (k = null, v = null) {
    this.key = k;
    this.value = v;
    this.prev = null;
    this.next = null;
  }
}

module.exports = Node;
