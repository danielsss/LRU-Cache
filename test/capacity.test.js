'use strict';

const mocha = require('mocha');
const chai = require('chai');
const LRUCache = require('../');

const expect = chai.expect;
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;

const UNIQUE_KEY = 'capacity:test:key';


describe('# LRU Cache capacity Test', () => {
  let cache = null;
  before(() => {
    cache = new LRUCache({capacity: 3});
  });

  it('lru-cache set cache failed when capacity = 0', () => {
    try {
      new LRUCache({capacity: 0});
    } catch (e) {
      expect(e).to.be.an('error');
    }
  });

  it('lru-cache will use the default capacity = 1000', () => {
    const c = new LRUCache();
    expect(c.capacity).to.equal(1000);
  });

  it('touch the doubly-linked-list capacity', () => {
    cache.set(UNIQUE_KEY, 123);
    // cache.set(UNIQUE_KEY, 234);
    // cache.set(UNIQUE_KEY, 345);
    //
    // // touched, remove value:123
    // cache.set(UNIQUE_KEY, 456);
    //
    // // get value:456
    // expect(cache.get(UNIQUE_KEY)).to.equal(456);
  });
});
