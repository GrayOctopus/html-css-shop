window.onload = function() {
    /**
     * 编写一个可以移动的函数
     * obj : 移动的对象
     * attr : 样式
     * target: 在哪里停止
     * speed : 速度
     * callback : 回执函数
     */
    function move(obj, attr, target, speed, callback) {
        clearInterval(obj.timer);
        //获取元素目前位置
        var current = parseInt(getStyle(obj, attr));
        if (current > target) {
            speed = -speed;
        }
        obj.timer = setInterval(function() {
            var oldValue = parseInt(getStyle(obj, attr));
            var newValue = oldValue + speed;
            // 将新的值赋给box1
            if ((newValue <= target && speed < 0) || (newValue >= target && speed > 0)) {
                newValue = target;
            }
            obj.style[attr] = newValue + "px";
            if (newValue == target) {
                clearInterval(obj.timer);
                callback && callback();
            }

        }, 10)
    }
    /*
    编写一个可以获得样式的函数
    */
    function getStyle(obj, name) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj, null)[name];
        } else {
            return obj.currentStyle[name];
        }
    }
}