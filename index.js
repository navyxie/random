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
	return arr[Math.ceil(Math.random()*(arr.length))%(arr.length)];
}
function sumArrPre(arr,arrIndex){
	var total=0;
	while(arrIndex--){
		total += arr[arrIndex];
	}
	return total;
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
module.exports = {
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
	randomArr:function(arr,count){
		var resultArr = [],tempArr = [];
		if(!isNumber(count)){
			count = 1;
		}
		if(isArray(arr)){
			tempArr = arr.slice();
			if(count >= arr.length){
				return tempArr;
			}
			for(var i = 0 ; i < count ; i++){
				resultArr = resultArr.concat(tempArr.splice(parseInt(Math.random()*(tempArr.length)),1));
			}		
		}
		return resultArr;
	}
}