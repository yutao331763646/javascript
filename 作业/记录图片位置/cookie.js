

function getCookie(key) {
	var str = document.cookie;
	var list = str.split("; ");
	for(var i=0; i<list.length; i++) {
		var kvs = list[i].split("=");
		if(kvs[0] == key) {
			return kvs[1];
		}
	}
	return null;
}

function setCookie(key, value, expires, path) {
	expires = expires || 0 
	var d = null;
	if(expires) {
		d = new Date()
		d.setDate( d.getDate()+expires );
	}
	document.cookie = key+"="+value + (d?"; expires="+d:"") + (path?"; path="+path:"");
}