
function log(x){
	console.log(x);
}

function print(x){
	document.write(x);
}

//敏感词过滤
function strfilter(target){
	var words = ["SB","TMD","WQNMLGB","GCD","89.64"];
			  
	for(var i in words){
		var reg = new RegExp( words[i], "gi" );
	  
		var stars = "";
		for(var k =0; k<words[i].length; k++ ){
			stars += "*";
		}
	  
		return target.replace(reg, stars);
	}
}

//随机生成一个min-max之间的数字
function randomInt(min, max) {
	return Math.round(Math.random()*(max-min)) + min;		
}

//随机验证码生成
function createCode(len){	
	var str = "";
	for(var i=0; i<len; i++) {
		
		var ascii = randomInt(48,90);
		while(ascii >=58 && ascii <=64) { //随机结果不符合要求
			ascii = randomInt(48,90);
		}
		
		//console.log(ascii);
		str += String.fromCharCode(ascii);			
	}
	return str;
}

//字符串转日期
function string2date(str, sep){
	sep = [sep] || ["-",".","/"];
	for(var i in sep){
		str = str.replace(new RegExp(sep[i],"g"),"-");
	}
	return new Date(str);
}

//日期转字符串
function date2string(d){
	return d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate();
}
//判断某年份是否为闰年
function isLeapYear(year){
	if(year%400==0 || year%100!=0 && year%4==0) {
		return true;
	} 
	return false;	
	
}

//获得某个月份的天数
function getDays(m,y){
	switch(m) {
		case 1 : 
		case 3 : 
		case 5 :
		case 7 :
		case 8 :
		case 10 :
		case 12 : return 31;
		case 4 :
		case 6 :
		case 9 :
		case 11 : return 30;
		case 2 : {
			if(isLeapYear(y)){
				return 29;
			}
			return 28;
		}
	}
}

//判断两个日期相差的天数
function countBetweenDate(d1,d2){
	if( typeof d1 === "string") {
		d1 = string2date(d1);
	}
	if( typeof d2 === "string") {
		d2 = string2date(d2);
	}
	
	return Math.abs(d1.getTime()-d2.getTime())/ (1000*3600*24);
}

//获得N天以后的日期
function getDayAfter(n){
	var now = new Date();
	now.setDate( now.getDate()+n );
	return now;
}

//判断是否存在getElementsByClassName方法
if(!document.getElementsByClassName){
	document.getElementsByClassName = function(classname){
		var alldom = document.getElementsByTagName("*");
		var temp = [];
		for(var i=0; i<alldom.length; i++){
			var strlist = alldom[i].className.split(" ");
			var result = false;
			for(var k in strlist){
				if(strlist[k] === classname){
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

function getStyle(ele, attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele)[attr];
	}
}


function offsetPage(obj){
    var _left = obj.offsetLeft;
	var _top = obj.offsetTop;
    while(obj.offsetParent){
        _left += obj.offsetParent.offsetLeft;
		_top += obj.offsetParent.offsetTop;
        obj = obj.offsetParent;
    }
	return {"left": _left, "top": _top};
}

function toarray(list){
	var temp = [];
	for(var i=0; i<list.length; i++){
		temp.push(list[i]);
	}
	return temp;
}










