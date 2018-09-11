'use strict';

const mocha = require('mocha');
const chai = require('chai');
const LRUCache = require('../');

const expect = chai.expect;
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;

const UNIQUE_KEY = 'length:test:key';


describe('# LRU Cache Length Test', () => {
  let cache = null;
  before(() => {
    cache = new LRUCache({capacity: 2});
  });

  it('should create an instance of lru-cache', () => {
    expect(cache).to.not.equal(null);
  });

  it('should get length = 0', () => {
    expect(cache.length()).to.equal(0);
  });

  it('should set an cache with successful', () => {
    expect(cache.set(UNIQUE_KEY, 'length:test:value')).to.equal(true);
  });

  it('should get length = 1', () => {
    expect(cache.length()).to.equal(1);
  });
});
