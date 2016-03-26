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
})