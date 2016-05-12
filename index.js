(function(){
	var root = this;
	function isType(obj,type){
		return Object.prototype.toString.call(obj) === '[object '+type+']';
	}
	function isObject(obj){
		return isType(obj,'Object');
	}
	function isFunction(fn){
		return isType(fn,'Function');
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
					tempArr[i] = parseInt(arr[i].replace('%',''));
				}else{
					tempArr[i] = parseInt(arr[i]);
				}
				total += tempArr[i];
			}
			randomVal = Math.ceil(Math.random()*total);
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
			if(isString(obj)){
				return obj;
			}
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
				if(isString(valArr[0]) && /^\d{1,2}%$/.test(valArr[0])){
					return getReturnKey(keyArr,randomArrByVal(valArr,true));
				}else if(isNumber(valArr[0])){
					return getReturnKey(keyArr,randomArrByVal(valArr));
				}else{
					return randomArr(keyArr);
				}
			}
			return;
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