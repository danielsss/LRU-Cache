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

  it('should destroy itself failed while is a head node', () => {
    const node = new Node(null, null);
    node.isHead = true;
    expect(node.destroy()).to.equal(false);
  });

  it('should destroy itself failed while is a rear node', () => {
    const node = new Node(null, null);
    node.isRear = true;
    expect(node.destroy()).to.equal(false);
  });

  it('should destroy itself failed without head & rear node', () => {
    const node = new Node(null, null);
    node.isRear = false;
    node.isHead = false;
    expect(node.destroy()).to.equal(false);
  });
});
