function log(x) {
	console.log(x);
}

function print(x) {
	document.write(x);
}

//敏感词过滤
function strfilter(target) {
	var words = ["SB", "TMD", "WQNMLGB", "GCD", "89.64"];
	for(var i in words) {
		var reg = new RegExp(words[i], "gi");
		var stars = "";
		for(var k = 0; k < words[i].length; k++) {
			stars += "*";
		}
		return target.replace(reg, stars);
	}
}

//随机生成一个min-max之间的数字
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

//随机验证码生成
function createCode(len) {
	var str = "";
	for(var i = 0; i < len; i++) {
		var ascii = randomInt(48, 90);
		while(ascii >= 58 && ascii <= 64) { //随机结果不符合要求
			ascii = randomInt(48, 90);
		}
		//console.log(ascii);
		str += String.fromCharCode(ascii);
	}
	return str;
}

var DateUtil = {
	string2date: function(str, sep) {//字符串转日期
		sep = [sep] || ["-", ".", "/"];
		for(var i in sep) {
			str = str.replace(new RegExp(sep[i], "g"), "-");
		}
		return new Date(str);
	},
	date2string: function(d) {//日期转字符串
		return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
	},
	isLeapYear: function(year) {//判断某年份是否为闰年
		if(year % 400 == 0 || year % 100 != 0 && year % 4 == 0) {
			return true;
		}
		return false;

	},
	getDays: function(m, y) {//获得某个月份的天数
		switch(m) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				{
					if(isLeapYear(y)) {
						return 29;
					}
					return 28;
				}
		}
	}, 
	countBetweenDate: function(d1, d2) { //判断两个日期相差的天数
		if(typeof d1 === "string") {
			d1 = string2date(d1);
		}
		if(typeof d2 === "string") {
			d2 = string2date(d2);
		}
		return Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);
	},
	getDayAfter: function(n) { //获得N天以后的日期
		var now = new Date();
		now.setDate(now.getDate() + n);
		return now;
	}
}

//判断是否存在getElementsByClassName方法
if(!document.getElementsByClassName) {
	document.getElementsByClassName = function(classname) {
		var alldom = document.getElementsByTagName("*");
		var temp = [];
		for(var i = 0; i < alldom.length; i++) {
			var strlist = alldom[i].className.split(" ");
			var result = false;
			for(var k in strlist) {
				if(strlist[k] === classname) {
					result = true;
					break;
				}
			}
			if(result) {
				temp.push(alldom[i]);
			}
		}
		return temp;
	}
}

//获取非行内样式的兼容
function getStyle(ele, attr) {
	if(ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele)[attr];
	}
}

//获取元素页面绝对位置
function offsetPage(obj) {
	var _left = obj.offsetLeft;
	var _top = obj.offsetTop;
	while(obj.offsetParent) {
		_left += obj.offsetParent.offsetLeft;
		_top += obj.offsetParent.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		"left": _left,
		"top": _top
	};
}

//将伪数组转成数组
function toarray(list) {
	var temp = [];
	for(var i = 0; i < list.length; i++) {
		temp.push(list[i]);
	}
	return temp;
}


//封装获取元素的方法
function $(str) {
	if(str[0] == "#") {
		return document.getElementById(str.substring(1));
	} else if(str[0] == ".") {
		return toarray(document.getElementsByClassName(str.substring(1)));
	} else {
		return toarray(document.getElementsByTagName(str));
	}
}

/* //懒加载函数
function addEvent(obj, eventname, func, isCapture){
	if(window.VBArray){
		obj.attachEvent("on"+eventname, func);
		addEvent = function(obj, eventname, func){
			obj.attachEvent("on"+eventname, func);
		}
	} else {
		obj.addEventListener(eventname, func, !!isCapture);
		addEvent = function(obj, eventname, func, isCapture){
			obj.addEventListener(eventname, func, !!isCapture);
		}
	}
}*/

//函数的柯里化
var addEvent = (function() {
	if(window.VBArray) {
		return function(obj, eventname, func) {
			obj.attachEvent("on" + eventname, func);
		}
	} else {
		return function(obj, eventname, func, isCapture) {
			obj.addEventListener(eventname, func, !!isCapture);
		}
	}
})();

//计算一个字符串的字节数
function countBytes(str, charset){
	if(str && charset) {
		var count = 0;
		if(charset.toLowerCase() === "gbk"){
			for(var i=0; i<str.length; i++){
				var asc = str.charCodeAt(i);
				if(asc < 256){
					count+=1;
				} else {
					count+=2;
				}
			}
		} else if(charset.toLowerCase() === "utf-16" || charset.toLowerCase() === "utf16") {
			for(var i=0; i<str.length; i++){
				var asc = str.charCodeAt(i);
				if(asc < 0xFFFF){ //65537
					count+=2;
				} else {
					count+=4;
				}
			}
		} else if(charset.toLowerCase() === "utf-8" || charset.toLowerCase() === "utf8") {
			for(var i=0; i<str.length; i++){
				var asc = str.charCodeAt(i);
				if(asc <= 0x7F){ //127
					count += 1;
				} else if(asc <= 0x7FF){ //2047
					count += 2;
				} else if(asc <= 0xFFFF) { //65537
					count += 3;
				} else {
					count += 4;
				}
			}
		}
		return count;
	}
}
//另外还有一种方法，可以计算JS在运行时，字符串的字节数，运行时是UTF-8标准，存储时字符集可以随意设定。
function countBytesRuning(str){
	return new Blob([str]).size;
}

var Cookie = {
	get: function(key){
		var cookiestr = document.cookie;
		var list = cookiestr.split("; ");
		for(var i=0; i<list.length; i++){
			var kvs = list[i].split("=");
			if(kvs[0]==key) {
				return kvs[1];
			}
		}
		return null;
	},
	set: function(key,value,expires,path){
		if( (typeof expires == "number") || (typeof expires == "string")) {
			expires = Number(expires);
			if(isNaN(expires)) {
				expires = undefined;
			} else {
				var d = new Date();
				d.setDate(d.getDate()+expires);
				expires = d;
			}
		} 
		if( !(expires instanceof Date) && typeof expires == "object") {
			expires = undefined;
		}
		document.cookie = key+"="+value+";" + (expires?"expires="+expires+";":"") + (path?"path="+path+";":"");
	}
}



