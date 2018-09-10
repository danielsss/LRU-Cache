'use strict';

const mocha = require('mocha');
const chai = require('chai');
const LRUCache = require('../');

const expect = chai.expect;
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;

const UNIQUE_KEY = 'lru:cache:unique:key:';

describe('# LRU Cache Test', () => {
  let cache = null;
  before(() => {
    cache = new LRUCache({capacity: 2});
  });

  it('should return false without value', () => {
    expect(cache.set(UNIQUE_KEY, undefined)).to.equal(false);
  });

  it('should return false without key', () => {
    expect(cache.set(null, undefined)).to.equal(false);
  });

  it('should set a cache to lru-cache', () => {
    expect(cache.set('tester', 'tester')).to.equal(true);
  });

  it('should get a cache from lru-cache by key `failureKey` failed', () => {
    expect(cache.get('failure:Key')).to.equal(false);
  });

  it('should get a cache from lru-cache by key `tester` successful', () => {
    expect(cache.get('tester')).to.equal('tester');
  });
});

