'use strict';

const mocha = require('mocha');
const chai = require('chai');
const LRUCache = require('../lib/lru.cache');

const expect = chai.expect;
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;

const UNIQUE_KEY = 'lru:cache:unique:key:';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  it('should return empty array with an invalid key', () => {
    expect(cache.toArray(null)).to.be.an('array').that.is.empty;
  });

  it('should return an array of doubly-linked-list', () => {
    expect(cache.toArray(UNIQUE_KEY).length).to.equal(2);
    expect(cache.toArray(UNIQUE_KEY)).to.includes(12334);
    expect(cache.toArray(UNIQUE_KEY)[0] === 12334).to.equal(true);
    expect(cache.toArray(UNIQUE_KEY)).to.includes('tester');
    expect(cache.toArray(UNIQUE_KEY)[1] === 'tester').to.equal(true);
  });

  it('should timeout by node itself', async () => {
    cache = new LRUCache({capacity: 10, maxAge: 1000});
    expect(cache.set(UNIQUE_KEY, 123)).to.equal(true);
    expect(cache.set(UNIQUE_KEY, 234)).to.equal(true);
    expect(cache.set(UNIQUE_KEY, 345)).to.equal(true);
    expect(cache.set(UNIQUE_KEY, 456)).to.equal(true);
    await sleep(1000 * 2);
    expect(cache.toArray(UNIQUE_KEY)).to.be.an('array').that.is.empty;
  });

  it('should auto correct maxAge to 1000 ms', async () => {
    cache = new LRUCache({capacity: 10, maxAge: 100});
    expect(cache.set(UNIQUE_KEY, 123)).to.equal(true);
    await sleep(1000 * 2);
    expect(cache.toArray(UNIQUE_KEY)).to.be.an('array').that.is.empty;
  });
});

