require ('!style-loader!css-loader!sass-loader!../../public-resource/css/components-dir/base.scss');
var session = require ('./session.js');
var user = {}; //全局对象

user.SERVER_URL = '/SCIEManagement';


// 加载图标
user.loading = function (element) {
    var loadingHtml = '<div id="loading"></div>';
    element.html(loadingHtml);
}
// 设置cookie
user.setCookie = function (name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies 
user.getCookie = function (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//删除cookies 
user.delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
// 注销
user.logout = function (event) {
    event.preventDefault();
    var ajaxArgs = {
        username: user.my_username,
    };
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/admin/logout',
        data: ajaxArgs,
        success: function (data) {
            if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                if(data.code == 200) {
                    session.setLoginState(false);
                    $.notice("提示！", "注销成功，正在跳转...");
                    user.jumpUrl(user.SERVER_URL, 2000);
                } else {
                    $.notice("提示！", "注销失败，请重试...");
            }
        }
    })
}
// 地址跳转
user.jumpUrl = function (url, time) {
    setTimeout(function () {
        window.location.href = url;
    }, time)
}
user.my_username = user.getCookie('my_username');
user.my_id = user.getCookie('my_id');
user.my_role_id = user.getCookie('my_role_id');
user.loginState = session.getLoginState();
$(function () {

    if (!user.loginState) {
        $.notice('提示！', '请进行用户登录，正在跳转登录页面...');
        user.jumpUrl(user.SERVER_URL, 2000);
    }
    $('#current_username').html(user.my_username);
    $('.dropdown-toggle').on('mouseenter', function () {
        $('.user-nav').slideDown("100");
    });
    $('.top-nav-right').on('mouseleave', function () {
        if ($('.user-nav').show()) {
            $('.user-nav').hide();
        }
    });
    $('#logout').on('click', user.logout);
});
module.exports = user;
