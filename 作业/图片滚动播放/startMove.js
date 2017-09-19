// JavaScript Document
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, false)[attr];
	}
}

/** 
把目标对象的指定的CSS属性，过渡到相应的值
1 目标对象， 2 指定CSS属性和目标值   3 回调函数
*/
function startMove(obj, json, fn) {
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		for (attr in json) {
			//获取当前属性值
			if (attr == 'opacity') {
				var iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, attr));
			}
			document.title = iCur;
			//计算速度
			var iSpeed = (json[attr] - iCur) / 8;
			iSpeed > 0 ? iSpeed = Math.ceil(iSpeed) : iSpeed = Math.floor(iSpeed);

			//判断停止
			if (iCur == json[attr]) {
				clearInterval(obj.timer);
				if (fn) {
					fn();
				}
			} else {
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + parseInt(iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = (iCur + iSpeed) + 'px';
				}
			}
		}
	}, 30);
}

//原理，每次执行一轮属性