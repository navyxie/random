(function(){
	var root = this;
	function isType(obj,type){
		return Object.prototype.toString.call(obj) === '[object '+type+']';
	}
	function isObject(obj){
		return isType(obj,'Object');
	}
	function isArray(arr){
		return isType(arr,'Array');
	}
	function isString(str){
		return isType(str,'String');
	}
	function isNumber(num){
		return isType(num,'Number');
	}
	function isUndefined(ud){
		return isType(ud,'Undefined');
	}
	function randomArr(arr){
		return arr[randomNum(arr.length)];
	}
	function randomNum(min,max){
		if(isUndefined(max)){
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random()*max);
	}
	function randomArrByVal(arr,percent){
		var tempArr = [];
		var total = 0;
		var randomVal,i,len;
		var preTotal = 0;
		try{
			for(i = 0 , len = arr.length ; i < len; i++){
				if(percent){
					tempArr[i] = (arr[i] == 0) ? 0 : arr[i].replace('%','');
				}else{
					tempArr[i] = arr[i];
				}
				tempArr[i] = 1 * tempArr[i]
				total += tempArr[i];
			}
			randomVal = Math.random()*total;
			if(randomVal === 0){
				return;
			}
			for(i = 0; i < len; i++){
				preTotal += tempArr[i];
				if(randomVal <= preTotal){
					return i;
				}
			}
			return;
		}catch(e){
			return;
		}
	}
	function getReturnKey(keys,rKey){
		if(isUndefined(rKey)){
			return;
		}
		return keys[rKey];
	}
	var outPut = {
		rate:function(obj) {
			var keyArr = [],valArr = [];
			var returnKey;
			if(isArray(obj)){
				return randomArr(obj);
			}
			if(isObject(obj)){
				for(var k in obj){
					if(obj.hasOwnProperty(k)){
						keyArr.push(k);
						valArr.push(obj[k]);
					}
				}
				var rateType = 2; //default number
				var len = valArr.length
				for (var i = 0 ; i < len; i++) {
					if (isString(valArr[i]) && ~~valArr[i].indexOf('%')) {
						rateType = 1;
						break;
					}
					if (!isNumber(valArr[i])) {
						rateType = 0;
						break;
					}
				}
				if(rateType === 1){
					var a = randomArrByVal(valArr,true)
					return getReturnKey(keyArr,a);
				}else if(rateType === 2){
					return getReturnKey(keyArr,randomArrByVal(valArr));
				}else{
					return randomArr(keyArr);
				}
			}
			return obj;
		},
		randomArr:function(arr,count,random_key){
			var resultArr = [],tempArr = [];
			var itemIsObj = true;
			var keyObj = {};
			if(!isNumber(count)){
				random_key = count;
				count = 1;
			}
			if(isArray(arr)){
				tempArr = arr.slice();
				if(count >= arr.length){
					return tempArr;
				}
				for(var i = 0 , len = arr.length ; i < len ; i++){
					if(!isObject(arr[i])){
						itemIsObj = false;
						break;
					}
					keyObj[i] = arr[i][random_key] || 0;
				}
				if(itemIsObj === true && !isUndefined(random_key)){
					for(i = 0 ; i < count ; i++){
						var oneKey = outPut.rate(keyObj);
						if(!isUndefined(oneKey)){
							resultArr.push(tempArr[oneKey]);
							delete keyObj[oneKey];
						}
					}
				}else{
					for(i = 0 ; i < count ; i++){
						resultArr = resultArr.concat(tempArr.splice(parseInt(Math.random()*(tempArr.length)),1));
					}	
				}	
			}
			return resultArr;
		}
	};
	if (typeof exports !== 'undefined' || (typeof module !== 'undefined' && module.exports)){
		module.exports = outPut;
	}else if(typeof define === 'function' && define.amd){
		define('random', [], function(){
			return outPut;
		});
	}else if(typeof define === 'function' && define.cmd){
		define(function(){
			return outPut;
		})
	}else{
		root.random = outPut;
	}
}.call(this));