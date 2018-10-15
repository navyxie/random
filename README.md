# 概率生成器

[![Build Status via Travis CI](https://travis-ci.org/navyxie/random.svg?branch=master)](https://travis-ci.org/navyxie/random) [![Coverage Status](https://coveralls.io/repos/github/navyxie/random/badge.svg?branch=master)](https://coveralls.io/github/navyxie/random?branch=master) [![NPM version](https://badge.fury.io/js/rate-random.png)](http://badge.fury.io/js/rate-random)

## API

- [`rate`](#rate)
- [`randomArr`](#randomArr)


## Usage

<a name="rate">

api : rate

```
var RateRandom = require('rate-random');
RateRandom.rate({a:1,b:2,c:3});//a,b,c按概率1/6,2/6,3/6抽取
RateRandom.rate({a:'20%',b:'20%',c:'30%'});//a,b,c按概率2/7,2/7,3/7抽取
```

<a name="randomArr">

api : randomArr

```
var RateRandom = require('rate-random');
var a = [1,2,3];
// return Array
RateRandom.randomArr(a);//从1，2，3中随机抽取一个
RateRandom.randomArr(a,2);////从1，2，3中随机抽取两个
RateRandom.randomArr([{a:'a',weight:10},{b:'b',weight:20},{c:'c',weight:1}],'weight');随机抽取一个，以weight为权重
RateRandom.randomArr([{a:'a',weight:10},{b:'b',weight:20},{c:'c',weight:1}],2,'weight');随机抽取两个，以weight为权重
RateRandom.randomArr([{a:'a',weight:10},{b:'b',weight:20},{c:'c',weight:1}],2);随机抽取两个
RateRandom.randomArr([{a:'a',weight:'10%'},{b:'b',weight:'20%'},{c:'c',weight:'1%'}],2);随机抽取两个
```