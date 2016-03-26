# 概率生成器

## API

- [`rate`](#rate)
- [`randomArr`](#randomArr)


## Usage

<a name="rate">

api : rate

```
var RandomRate = require('random-rate');
RandomRate.rate({a:1,b:2,c:3});
RandomRate.rate({a:'20%',b:'20%',c:'30%'});
```

<a name="randomArr">

api : randomArr

```
var RandomRate = require('random-rate');
var a = [1,2,3];
RandomRate.randomArr(a);//从1，2，3中随机抽取一个
RandomRate.randomArr(a，2);////从1，2，3中随机抽取两个
```