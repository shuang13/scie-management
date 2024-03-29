

// 加载图标
var loading = function (element) {

    var loadingHtml = '<div id="loading" >' +
        '<div class="fa fa-spinner fa-pulse fa-3x fa-fw"></div>' +
        '<p>登录中......</p>' +
        '</div>';
    element.html(loadingHtml);
}
// 表单验证
var validate = function (ajaxArgs) {

    if ($.trim(ajaxArgs.username) == '') {
        $.notice("提示！", "用户名不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.verification) == '') {
        $.notice("提示！", "验证码不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.password) == '') {
        $.notice("提示！", "密码不能为空！");
        return false;
    }

    return true;
}
// 设置cookie
var setCookie = function (name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies 
var getCookie = function (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies 
var delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
// 地址跳转
var jumpUrl = function (url, time) {
    setTimeout(function () {
        window.location.href = url;
    }, time)
}
var session = {};
session.getUserId = '1';
// 获取当前登录状态
session.getLoginState = function () {
    var state = sessionStorage.getItem('loginState');
    if(state) {
        return JSON.parse(state);
    } else {
        return false;
    }
};

// 设置当前登录状态
session.setLoginState = function (userInfo) {
    if(userInfo !== false) {
        sessionStorage.setItem('loginState', JSON.stringify(userInfo));
    } else {
        sessionStorage.removeItem('loginState');
    }
};


$(document).ready(function () {
    var $form = $('form');
    var $user = $form.find('#username');
    var $passwd = $form.find('#password');
    var $submit = $form.find('.login-submit');
    var serverurl = '/SCIEManagement';
    var sessionId = getCookie(name);
    var t = new Date();
    $('.ver-img').attr('src', serverurl + '/kaptcha.jpg?sessionId=' + t.getTime());
    $('.fa-refresh').on('click', function () {
        $('.ver-img').attr('src', serverurl + '/kaptcha.jpg?t=' + t.getTime());
    })   
    // enter键登录   
    $(document).keyup(function(event){ 
        if(event.keyCode ==13){ 
          $submit.trigger("click"); 
        } 
    });
    $submit.on('click', function (event) {
        event.preventDefault();
        var ajaxArgs = {
            username: $user.val(),
            verification: $('#ver-code').val(),
            password: $passwd.val()
        };
        console.log(ajaxArgs);
        if(!validate(ajaxArgs)) {
            return false;
        }
        $.ajax({
            type: "POST",
            url: serverurl + "/admin/login",
            beforeSend: $.notice('提示！', '正在登录...', function () {
                loading($('.jq-notice-context'));
            }),
            data: ajaxArgs,
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                var message = data.message;
                if(data.code == 200) {
                    var userStorage = {};
                    var admin = data.admin;
                    // 设置登录状态
                    session.setLoginState(admin.username);
                    // 登录用户信息保存到cookie中
                    setCookie('my_username', admin.username);
                    setCookie('my_id', admin.id);
                    setCookie('my_role_id', admin.role_id);
                    $.notice("提示！", "登录成功，正在跳转...");
                    jumpUrl('asset/build/home/index/page.html', 2000);
                } else {
                    $.notice("提示！", "登录失败，" + message + "!");
                }
            }
        })

    });
});