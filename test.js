var should = require('should');
var index = require('./index');
var rate = index.rate;
var randomArr = index.randomArr;
describe('test api : rate',function(){
	it('should be ok',function(){
		var arr = ['A','B','C'];
		arr.should.containEql(rate(arr));
	});
	it('should be ok',function(){
		var arr = [];
		should(rate(arr)).undefined();
	});
	it('should be ok',function(){
		var arr = ['A',{B:'Object'},'C'];
		arr.should.containEql(rate(arr));
	});
	it('should be ok',function(){
		var obj = {
			'A':'5%',
			'B':'5%',
			'C':'90%'
		};
		obj.should.have.properties(rate(obj));
	});
	it('should be ok',function(){
		var obj = {};
		should(rate(obj)).undefined();
	});
	it('should be ok',function(){
		var obj = "str";
		rate(obj).should.be.equal(obj);
	});
	it('should be ok',function(){
		var obj = {
			'A':'0%',
			'B':'0%',
			'C':'1%'
		};
		rate(obj).should.be.equal('C');
	});
	it('should be ok',function(){
		var obj = {
			'A':'0%',
			'B':'0%',
			'C':'0%'
		};
		should(rate(obj)).undefined();
	});
	it('should be ok',function(){
		var obj = {
			'A':2,
			'B':2,
			'C':4
		};
		obj.should.have.properties(rate(obj));
	});
	it('should be ok',function(){
		var obj = {
			'A':{'A':1},
			'B':{'B':2},
			'C':{'C':3}
		};
		obj.should.have.properties(rate(obj));
	});
	it('should be ok',function(){
		var obj = {
			'A':0,
			'B':2,
			'C':3
		};
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			if (rate(obj) === 'A') {
				count++
			}
		}
		count.should.be.equal(0)
	});
	it('should be ok',function(){
		var obj = {
			'A':0,
			'B':0,
			'C':1
		};
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			if (rate(obj) === 'C') {
				count++
			}
		}
		count.should.be.equal(1000000)
	});
	it('should be ok',function(){
		var obj = {
			'A':0,
			'B':'22%',
			'C':'30%'
		};
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			if (rate(obj) === 'A') {
				count++
			}
		}
		count.should.be.equal(0)
	});
	it('should be ok',function(){
		var obj = {
			'A':0,
			'B':0,
			'C':'100%'
		};
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			if (rate(obj) === 'C') {
				count++
			}
		}
		count.should.be.equal(1000000)
	});
});
describe('test api : randomArr',function(){
	it('should be ok',function(){
		var a = ['A','B','C'];
		randomArr(a).should.be.length(1);
	});
	it('should be ok',function(){
		var a = ['A','B','C'];
		randomArr(a,2).should.be.length(2);
	});
	it('should be ok',function(){
		var a = ['A','B','C'];
		randomArr(a,4).should.be.length(3);
	});
	it('should be ok',function(){
		this.timeout(50000)
		var a = [
			{'rate':0.2,data:{val:1}},
			{'rate':0,data:{val:2}},
			{'rate':0.15,data:{val:3}}
		];
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			var item = randomArr(a,'rate');
			if (item[0].data.val === 2) {
				count++
			}
		}
		count.should.be.equal(0)
	});
	it('should be ok',function(){
		this.timeout(50000)
		var a = [
			{'rate':'20%',data:{val:1}},
			{'rate':0,data:{val:2}},
			{'rate':'15%',data:{val:3}}
		];
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			var item = randomArr(a,'rate');
			if (item[0].data.val === 2) {
				count++
			}
		}
		count.should.be.equal(0)
	});
	it('should be ok',function(){
		this.timeout(50000)
		var a = [
			{'rate':'20%',data:{val:1}},
			{'rate':'0%',data:{val:2}},
			{'rate':'15%',data:{val:3}}
		];
		var count = 0;
		for (var i = 0 ; i < 1000000; i++) {
			var item = randomArr(a,'rate');
			if (item[0].data.val === 2) {
				count++
			}
		}
		count.should.be.equal(0)
	});
	it('should be ok , array item is obj , random by key',function(){
		var a = [{a:'a',weight:2},{b:'b',weight:20},{c:'c',weight:1}];
		var arr = randomArr(a,'weight');
		arr.should.be.length(1);
	});
	it('should be ok , array item is obj , random by key',function(){
		var a = [{a:'a',weight:2},{b:'b',weight:20},{c:'c',weight:1}];
		var arr = randomArr(a,2,'weight');
		arr.should.be.length(2);
	});
	it('should be ok , array item is obj , random by key',function(){
		var a = [{a:'a'},{b:'b'},{c:'c',weight:1}];
		var arr = randomArr(a,'weight');
		arr.should.be.length(1);
		arr[0]['c'].should.be.equal('c');
	});
	it('should be ok , array item is obj , random by key',function(){
		var a = [{a:'a'},{b:'b'},{c:'c',weight:1}];
		var arr = randomArr(a,2,'weight');
		arr.should.be.length(1);
		arr[0]['c'].should.be.equal('c');
	});
	it('should be ok , array item is obj , random by key',function(){
		var a = [{a:'a'},{b:'b'},{c:'c',weight:0}];
		var arr = randomArr(a,2,'weight');
		arr.should.be.length(0);
	});
	it('should be ok , array item is obj , random by key',function(){
		var a = [{a:'a',weight:2},{b:'b',weight:20},{c:'c',weight:1}];
		var arr = randomArr(a,2);
		arr.should.be.length(2);
	});
})