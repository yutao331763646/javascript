function snow(opt) {
    this.box = document.getElementById(opt.id);
    this.times = opt.times;
    this.url = opt.url;
    this.fx = opt.fx || 1; //ÅÐ¶ÏÑ©»¨·½Ïò
}

snow.prototype = {
    DOMready: function () {
        var cell = document.createElement('img');
        cell.src = this.url;
        var size = Math.floor(Math.random() * 21 + 10);
        cell.l = Math.floor(Math.random() * (this.box.clientWidth - size));
        cell.t = 0;
        cell.style.cssText = 'width:' + size + 'px;height:' + size + 'px;position:absolute;top:0;left:' + cell.l + 'px;'
        cell.sl = Math.floor(Math.random() * 5 + 1) * this.fx;
        cell.st = Math.floor(Math.random() * 5 + 1);
        var self = this;
        cell.timer = setInterval(function () {
            cell.l += cell.sl;
            cell.t += cell.st;
            if (cell.l < 0 || cell.l > self.box.clientWidth - size || cell.t > self.box.clientHeight - size) {
                clearInterval(cell.timer)
                self.box.removeChild(cell)
            }
            cell.style.left = cell.l + 'px';
            cell.style.top = cell.t + 'px';
        }, 10)
        this.box.appendChild(cell)
    },
    loop: function () {
        var self = this;
        var timer = setInterval(function () {
            self.DOMready()
        }, this.times)
    }
}