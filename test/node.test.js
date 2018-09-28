'use strict';

const mocha = require('mocha');
const chai = require('chai');
const Node = require('../lib/node');

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;

const UNIQUE_KEY = 'node:unique:test:key';

describe('# Node constructor', () => {
  it('generate an instance of Node constructor', () => {
    const node = new Node(null, null);
    expect(node).to.be.an('object');
    expect(node.key).to.equal(null);
    expect(node.value).to.equal(null);
    expect(node.next).to.equal(null);
    expect(node.prev).to.equal(null);
    expect(node.hit).to.equal(0);
  });


  it('generate an instance of Node constructor with default values', () => {
    const value = 123;
    const node = new Node(UNIQUE_KEY, value);
    expect(node).to.be.an('object');
    expect(node.key).to.equal(UNIQUE_KEY);
    expect(node.value).to.equal(value);
    expect(node.next).to.equal(null);
    expect(node.prev).to.equal(null);
    expect(node.hit).to.equal(0);
  });

  it('should destroy itself failed without threadhodlds param', () => {
    const node = new Node(null, null);
    expect(node.destroy()).to.equal(false);
  });

  it('should destroy itself failed when a non-integer as param', () => {
    const node = new Node(null, null);
    expect(node.destroy('abc')).to.equal(false);
  });

  it('should destroy itself failed when ms <= 0', () => {
    const node = new Node(null, null);
    expect(node.destroy(-1)).to.equal(false);
    expect(node.destroy(0)).to.equal(false);
  });
});
