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

  it('should return false if not set any cache', () => {
    expect(cache.get()).to.equal(false);
    expect(cache.hit()).to.equal(0);
  });

  it('should return false if use invalid key', () => {
    expect(cache.get(null)).to.equal(false);
    expect(cache.get(undefined)).to.equal(false);
  });

  it('should auth failed before set the key to Map Object', () => {
    expect(cache.authKey(null)).to.equal(false);
    expect(cache.authKey(UNIQUE_KEY)).to.equal(false);
  });

  it('should return false without value', () => {
    expect(cache.set(UNIQUE_KEY, undefined)).to.equal(false);
  });

  it('should return false without key', () => {
    expect(cache.set(null, undefined)).to.equal(false);
  });

  it('should set a cache to lru-cache', () => {
    expect(cache.set(UNIQUE_KEY, 'tester')).to.equal(true);
  });

  it('should auth success after the key was set on Map Object', () => {
    expect(cache.authKey(UNIQUE_KEY)).to.equal(true);
  });

  it('should set a cache to lru-cache', () => {
    expect(cache.set(UNIQUE_KEY, 12334)).to.equal(true);
  });

  it('should get a cache from lru-cache by key `failureKey` failed', () => {
    expect(cache.get('failure:Key')).to.equal(false);
  });

  it('should get a cache from lru-cache by key `tester` successful', () => {
    expect(cache.get(UNIQUE_KEY)).to.equal(12334);
  });

  it('should get hit from cache and size greate than 0', () => {
    expect(cache.hit(UNIQUE_KEY)).to.gte(0);
  });
});

