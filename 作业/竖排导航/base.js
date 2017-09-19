
var Base = {
	getById : function(id){
		return document.getElementById(id);
	},
	getByName : function(name){
		return document.getElementsByName(name)[0];
	},
	getByTag : function(tagname){
		return document.getElementsByTagName(tagname)[0];
	},
	getByClassName : function(classname){
		return document.getElementsByClassName(classname)[0];
	},
	log : function(obj){
		document.title = obj;
	},
	//getStyle(obj, "top");
	getStyle : function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	},
	getChildElements : function(node){
		var nodelist = node.childNodes;
		var reslist = [];
		
		for(var i=0; i<nodelist.length; i++) {
			if(nodelist[i].nodeType == 1){
				reslist.push(nodelist[i]);
			}
		}
		
		return reslist;
	}
};
/**日期工具 */
var DateUtil = {
	//判断一个年份是否是闰年
	isLeapYear : function(year){
		if(year%4==0 && year%100!=0 || year%400==0){
			return true;
		} else {
			return false;
		}
	},
	//将日期对象按照指定的分隔符格式化成字符串
	format : function(_date, separator){
		var year = _date.getFullYear();
		var month = (_date.getMonth()+1)>9 ? (_date.getMonth()+1) : "0"+(_date.getMonth()+1);
		var date = _date.getDate()>9 ? _date.getDate() : "0"+_date.getDate();
		return year+separator+month+separator+date;
	},
	//字符串转日期对象
	parse : function(str, separator){
		var arr = str.split(separator);	//数组的join方法，按照指定的分隔符，将数组的所有元素连接起来，变成字符串，
		var dstr = arr.join("-");
		//转成相应的毫秒数
		var time = Date.parse(dstr);
		//创建一个日期对象
		var d = new Date(time);
		//修改time属性
		//d.setTime(time);
		return d;
	},
	//获得某个月份的天数
	getMonthLength : function(num){
		switch(num){
			case 1 :
			case 3 : 
			case 5 :
			case 7 :
			case 8 :
			case 10 :
			case 12 : return 31;
			case 2 : return 28;
			case 4 :
			case 6 :
			case 9 :
			case 11 : return 30;
		}
	}, 
	//获得两个日期直接相差的天数
	getDiff : function(date1, date2){
		var time1 = date1.getTime();
		var time2 = date2.getTime();
		return Math.floor(Math.abs(time1-time2)/(1000*60*60*24));
	},
	//获得N天以后的日期
	getSday : function(n){
		var now = new Date();
		var time = now.getTime();
		time += n*24*3600*1000;
		return new Date(time)
	}
};
