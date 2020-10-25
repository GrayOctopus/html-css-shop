window.onload = function() {
    var focus_ul = document.getElementById("focus_ul");
    // ul = imgList
    // div = outer
    // imgArr = imgArr
    // 获取ul里面的所有img
    var imgArr = focus_ul.getElementsByTagName("img");
    //动态调整ul的大小
    // var focus_nav = document.getElementsByTagName("focus_nav");
    // var a = document.createElement();
    focus_ul.style.width = 741 * imgArr.length + "px";
    // 大的div 721px
    // a的大小 18px*5=90px
    // 721-90 / 2 =
    // 动态调整a的位置
    var focus_nav = document.getElementsByClassName("focus_nav");
    var focus = document.getElementsByClassName("focus");
    focus_nav[0].style.left = (focus[0].offsetWidth - focus_nav[0].offsetWidth) / 2 + "px";
    //获取所有的链接
    var allSpan = focus_nav[0].getElementsByTagName("span");
    /**
     * 获得上一个和下一个按钮
     */
    var previous = document.getElementsByClassName("previous");
    var next = document.getElementsByClassName("next");



    //获得图片的索引
    var index = 0;
    /**
     * 点击链接切换到相应的图片
     */
    allSpan[index].style.backgroundColor = "black";
    for (var i = 0; i < allSpan.length; i++) {
        allSpan[i].num = i;
        // 为每个按钮绑定单击相应函数
        allSpan[i].onclick = function() {
            /**
             * 点击的时候停止自动切换
             */
            clearInterval(timer);
            index = this.num;
            // focus_ul.style.left = -(index * 741) + "px";
            getWhite();
            move(focus_ul, "left", -(index * 741), 10, function() {
                autoChange();
            })
        }
    }
    autoChange();


    /**
     * 每个按钮绑定相应
     */
    previous[0].onclick = function() {
        clearInterval(timer);
        /**
         * 如何获得点击的是哪个图片
         */
        move(focus_ul, "right", -(index * 741), 10, function() {
            autoChange();
        })
    }

    // 新建一个变白的函数
    function getWhite() {
        /**
         * 判度索引是否是最后一张
         */
        if (index >= imgArr.length - 1) {
            /**
             * 此时是最后一张图片
             */
            index = 0;
            focus_ul.style.left = 0;
        }
        for (var i = 0; i < allSpan.length; i++) {
            allSpan[i].style.backgroundColor = "";
        }
        allSpan[index].style.backgroundColor = "black";
    }

    //创建一个自动切换的函数
    var timer;

    function autoChange() {
        timer = setInterval(function() {
            //自动切换到下一张
            index++;
            index %= imgArr.length;

            move(focus_ul, "left", -index * 741, 10, function() {
                getWhite();
            })
        }, 3000);
    }

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