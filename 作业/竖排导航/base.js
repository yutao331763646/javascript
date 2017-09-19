
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
/**���ڹ��� */
var DateUtil = {
	//�ж�һ������Ƿ�������
	isLeapYear : function(year){
		if(year%4==0 && year%100!=0 || year%400==0){
			return true;
		} else {
			return false;
		}
	},
	//�����ڶ�����ָ���ķָ�����ʽ�����ַ���
	format : function(_date, separator){
		var year = _date.getFullYear();
		var month = (_date.getMonth()+1)>9 ? (_date.getMonth()+1) : "0"+(_date.getMonth()+1);
		var date = _date.getDate()>9 ? _date.getDate() : "0"+_date.getDate();
		return year+separator+month+separator+date;
	},
	//�ַ���ת���ڶ���
	parse : function(str, separator){
		var arr = str.split(separator);	//�����join����������ָ���ķָ����������������Ԫ����������������ַ�����
		var dstr = arr.join("-");
		//ת����Ӧ�ĺ�����
		var time = Date.parse(dstr);
		//����һ�����ڶ���
		var d = new Date(time);
		//�޸�time����
		//d.setTime(time);
		return d;
	},
	//���ĳ���·ݵ�����
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
	//�����������ֱ����������
	getDiff : function(date1, date2){
		var time1 = date1.getTime();
		var time2 = date2.getTime();
		return Math.floor(Math.abs(time1-time2)/(1000*60*60*24));
	},
	//���N���Ժ������
	getSday : function(n){
		var now = new Date();
		var time = now.getTime();
		time += n*24*3600*1000;
		return new Date(time)
	}
};
