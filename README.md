[![Build Status](https://travis-ci.com/danielsss/LRU-Cache.svg?branch=master)](https://travis-ci.com/danielsss/LRU-Cache)
[![GitHub issues](https://img.shields.io/github/issues/danielsss/LRU-Cache.svg)](https://github.com/danielsss/LRU-Cache/issues)
![Depfu](https://img.shields.io/depfu/depfu/example-ruby.svg)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

# LRU-Cache
LRU Cache Implementation by Node.js

## Usage

```js
const lru = require('LRU-Cache');
```

##### .set

* `capacity` - the list capacity and 0 is not allowed, default: 1000

```js
const cache = new lru({capacity: 100});
cache.set('test_key', 123);
cache.set('test_key', 234);
```

##### .get

* only the front node will be returned
* `key` - the map key

```js
const value = cache.get('test_key');
console.info(value === 234); // true
```


##### .toArray

```js
const values = cache.toArray();
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

