# 概率生成器

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
RateRandom.randomArr(a);//从1，2，3中随机抽取一个
RateRandom.randomArr(a，2);////从1，2，3中随机抽取两个
```