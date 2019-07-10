[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a9f7ebfd3f1740e2b2474ffc6b715b32)](https://app.codacy.com/app/danielsss/LRU-Cache?utm_source=github.com&utm_medium=referral&utm_content=danielsss/LRU-Cache&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.com/danielsss/LRU-Cache.svg?branch=master)](https://travis-ci.com/danielsss/LRU-Cache)
[![Coverage Status](https://coveralls.io/repos/github/danielsss/LRU-Cache/badge.svg?branch=master)](https://coveralls.io/github/danielsss/LRU-Cache?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/danielsss/LRU-Cache.svg)](https://github.com/danielsss/LRU-Cache/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/danielsss/LRU-Cache/badge.svg?targetFile=package.json)](https://snyk.io/test/github/danielsss/LRU-Cache?targetFile=package.json)

# LRU-Cache
LRU Cache implementions in Node.js

## Usage

```js
const lru = require('LRU-Cache');
```

##### .set

* `capacity` - the list capacity and 0 is not allowed, default: 1000
* `maxAge` - the node will be destroyed by itself in `maxAge` ms

```js
const cache = new lru({capacity: 100});
cache.set('test_key', 123);
cache.set('test_key', 234);
console.info(cache.toArray('test_key').length);
> 2
```

* instance `lru` with maxAge
```js
/* the node will be destroyed in 1000 ms one by one */
const cache = new lru({capacity: 100, maxAge: 1000});
cache.set('test_key', 123);
cache.set('test_key', 234);
console.info(cache.toArray('test_key').length);
> 0
```

##### .get

* only the front node will be returned
* `key` - the hash map key

```js
const value = cache.get('test_key');
console.info(value === 234); // true
```


##### .toArray

* `key` - the hash map key

```js
const values = cache.toArray(key);
console.info(values); // [234, 123]
```

## Test

```shell
npm run test
```

## Coverage


## LICENCE
MIT License

Copyright (c) 2018 Danielsss

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

