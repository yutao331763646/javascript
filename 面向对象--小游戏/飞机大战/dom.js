//基类，引擎、飞机、子弹都从基类继承
function Dom(){
	this.width = function(val){
		if(val == undefined) {
			return this.body.offsetWidth;
		}
		this.body.style.width = val + "px";
	}
	this.height = function(val){
		if(val == undefined) {
			return this.body.offsetHeight;
		}
		this.body.style.height = val + "px";
	}
	this.left = function(val){
		if(val == undefined) {
			return this.body.offsetLeft;
		}
		this.body.style.left = val + "px";
	}
	this.top = function(val){
		if(val == undefined) {
			return this.body.offsetTop;
		}
		this.body.style.top = val + "px";
	}
}
