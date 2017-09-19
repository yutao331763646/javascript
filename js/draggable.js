
/**
 * draggbale 拖拽元素
 * 1.0版本
 * 使用方式：
 * draggable(ele, {
 * 		x : false, //表示水平方向是否可拖拽
 * 		y : true, //表示垂直方向是否可拖拽
 * 		limit : true, //表示活动范围是否限制在定位父元素内
 * 		paddingLeft : 0,  //增加填充，即进一步缩小活动范围
		paddingRight :0,  //增加填充，即进一步缩小活动范围
		paddingTop : 0,  //增加填充，即进一步缩小活动范围
		paddingBottom  : 0,  //增加填充，即进一步缩小活动范围
		maringLeft : 0, //设置margin值，可以消除由于margin带来的拖拽误差，不填则可能会受影响
		marginTop : 0, //设置margin值，可以消除由于margin带来的拖拽误差，不填则可能会受影响
		callback : function(section, distance){
			回调函数，在拖拽过程中不断触发
			两个参数分别为：拖拽元素的可活动范围大小，拖拽元素在可活动范围内的坐标
			section包括，minLeft\maxLeft\minTop\maxTop
			distance包括, x\y
			绑定了this，回调函数中可以直接使用this来指向拖拽元素ele本身
		}
 * })
 * */

(function(){
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
	
	//获取样式
	function getStyle(ele, attr){
		if(ele.currentStyle) {
			return ele.currentStyle[attr];
		} else {
			return getComputedStyle(ele)[attr];
		}
	}
	
	//函数的事件添加
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
	
	//合并对象
	function merge(a, b){
		if(!b) {
			return a;
		}
		var newobj = {};
		for(var attr in a){
			newobj[attr] = a[attr];
		}
		for(var attr in b) {
			newobj[attr] = b[attr];
		}
		return newobj;
	}
	
	window.draggable = function(ele, _options) {
		//如果定位方式不是absolute，直接返回
		if(getStyle(ele,"position") != "absolute" && getStyle(ele,"position") != "fixed") return;
		
		var default_options = {
			x : true,
			y : true,
			limit : true,
			paddingLeft : 0,
			paddingRight :0,
			paddingTop : 0,
			paddingBottom  : 0,
			marginLeft : 0,
			marginTop : 0,
			callback : function(){}
		};
		
		var options = merge(default_options, _options);
		
		
		
		/*
		if(options.limit) { //如果用户设置了限定范围
			//计算元素的坐标取值范围
			var section = {
				minLeft : options.paddingLeft - options.marginLeft,
				maxLeft : ele.offsetParent.offsetWidth - ele.offsetWidth - options.paddingRight - options.marginLeft,
				minTop : options.paddingTop - options.marginTop,
				maxTop : (ele.offsetParent.offsetHeight - ele.offsetHeight) - options.paddingBottom - options.marginTop
			}
		}*/
		
		//console.log(section);
		
		var startPoint = {
			x: offsetPage(ele).left,
			y: offsetPage(ele).top
		}
		
		addEvent(ele, "mousedown", function(e){
			var e = e || event;
			
			//计算鼠标和要拖拽元素的相对位置
			var mouse = {
				pageX : e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft,
				pageY : e.clientY + document.body.scrollTop || document.documentElement.scrollTop
			}
			mouse.offsetX = mouse.pageX - offsetPage(ele).left + options.marginLeft;
			mouse.offsetY = mouse.pageY - offsetPage(ele).top + options.marginTop;
			
			//添加移动事件
			addEvent(document, "mousemove", move);
			function move(e){
				var e = e || event;
				//计算鼠标当前的页面坐标pageX/Y
				var currentPos = {
					pageX : e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft,
					pageY : e.clientY + document.body.scrollTop || document.documentElement.scrollTop
				}
				
				var section = {
					minLeft : options.paddingLeft - options.marginLeft,
					maxLeft : ele.offsetParent.offsetWidth - ele.offsetWidth - options.paddingRight - options.marginLeft,
					minTop : options.paddingTop - options.marginTop,
					maxTop : (ele.offsetParent.offsetHeight - ele.offsetHeight) - options.paddingBottom - options.marginTop
				}
				
				
				if(options.limit) { //如果限定范围
					if(options.x) { //如果允许水平拖动
						ele.style.left = Math.min(section.maxLeft ,Math.max(section.minLeft, currentPos.pageX - offsetPage(ele.offsetParent).left - mouse.offsetX)) + "px";
					}
					if(options.y) { //如果允许垂直拖动
						ele.style.top = Math.min(section.maxTop ,Math.max(section.minTop, currentPos.pageY - offsetPage(ele.offsetParent).top - mouse.offsetY)) + "px";
					}
				} else {
					if(options.x) {
						ele.style.left = currentPos.pageX - offsetPage(ele.offsetParent).left - mouse.offsetX + "px";
					}
					if(options.y) {
						ele.style.top = currentPos.pageY - offsetPage(ele.offsetParent).top - mouse.offsetY + "px";
					}
				}
				options.callback.call(ele, section, {x:offsetPage(ele).left - startPoint.x, y:offsetPage(ele).top - startPoint.y});
			}
			addEvent(document, "mouseup", function(e){
				//document.detach("mousemove", move);
				document.removeEventListener("mousemove", move);
			});
		});
		
	}
	
})();


