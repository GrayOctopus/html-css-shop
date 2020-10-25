window.onload = function() {
    //获取大的表单
    var form = document.getElementsByTagName("form");
    //获取所有的li
    var li = form[0].getElementsByTagName("li");

    //获取输入手机号码的表单
    var phone = document.getElementById("phone");
    //获取输入验证码的表单
    var code = document.getElementById("code");
    //获取输入登录密码
    var password = document.getElementById("password");
    //确认安全程度
    var safe = document.getElementsByTagName("safe");
    //获取重复的确认密码
    //获取按钮
    var btn = document.getElementsByClassName("btn");




    check(phone, 0, isPhone);
    check(code, 1, isCode);
    check(password, 2, isPassword);


    /**
     * obj : 传进来的表单
     * index : 传进来的是第几个的li中的正确和错误
     * fun : 传进来用来验证正则表达式的函数
     * 
     */
    function check(obj, index, fun) {
        obj.onchange = function() {
            //当鼠标离开的时候就触发
            //获取第indexli正确
            var success = li[index].getElementsByClassName("success");
            //获取第indexli错误
            var error = li[index].getElementsByClassName("error");
            if (!fun(obj.value)) {
                //如果不符合正则表达式，就出现错误
                success[0].style.display = "";
                error[0].style.display = "inline-block";
            } else {
                //如果符合正则表达式
                error[0].style.display = "";
                success[0].style.display = "inline-block";
            }
        }

    }

    /**
     * 创建一个判度胺是否是手机号码的正则表达式
     * 号码的规范：
     * 第一位1    第2-11位置 0-9 都可
     * ^1[0-9]{10}
     */

    function isPhone(str) {
        var reg = /^1[0-9]{10}$/;
        return reg.test(str);
    }

    function isCode(str) {
        var reg = /^[0-9]{4}$/;
        return reg.test(str);
    }


    function isPassword(str) {
        var reg = /[0-9]{6-16}/;
        return reg.test(str);
    }

    // function isRuo(str) {
    //     var reg = //;
    //         return reg.test(str);
    // }
}