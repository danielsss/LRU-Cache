'use strict';

const mocha = require('mocha');
const chai = require('chai');
const DoublyList = require('../lib/list');

const expect = chai.expect;
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;

const UNIQUE_KEY = 'capacity:test:key';


describe('# Doubly-linked-List Test', () => {
  let list = null;
  before(() => {
    list = new DoublyList({capacity: 3});
  });

  it('should get 0 of cache hit', () => {
    expect(list.hit()).to.equal(0);
  });

  it('set cache failed when capacity = 0', () => {
    try {
      new DoublyList({capacity: 0});
    } catch (e) {
      expect(e).to.be.an('error');
    }
  });

  it('will use the default capacity = 1000', () => {
    const c = new DoublyList();
    expect(c.capacity).to.equal(1000);
  });

  it('will be received an empty array', () => {
    expect(list.toArray().length).to.equal(0);
  });

  it('reach to capacity and pop from rear', () => {
    expect(list.get()).to.equal(null);

    list.set(UNIQUE_KEY, 123);
    list.set(UNIQUE_KEY, 234);
    list.set(UNIQUE_KEY, 345);

    // touched, remove value:123
    list.set(UNIQUE_KEY, 456);

    // get value:456
    expect(list.get(UNIQUE_KEY)).to.equal(456);
  });

  it('get all the value as array = [456, 345, 234]', () => {
    const arr = list.toArray();
    expect(arr).to.includes(456);
    expect(arr).to.includes(345);
    expect(arr).to.includes(234);
  });

  it('set with an invalid value', () => {
    expect(list.set(UNIQUE_KEY, null)).to.equal(false);
    expect(list.set(UNIQUE_KEY, undefined)).to.equal(false);
  });

  it('should get hit 0 but at least have one node in it', () => {
    expect(list.size).to.gte(0);
    expect(list.hit()).to.gte(0);
  });

  it('reset doubly-linked-list', () => {
    expect(list.reset()).to.equal(true);
  });

  it('pop values until list to be empty', () => {
    list.set(UNIQUE_KEY, 1);
    list.set(UNIQUE_KEY, 2);
    list.set(UNIQUE_KEY, 3);

    expect(list.pop()).to.equal(true);
    expect(list.pop()).to.equal(true);
    expect(list.pop()).to.equal(true);
    expect(list.size).to.equal(0);
  });
});
