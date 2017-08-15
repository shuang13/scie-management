var session = {};
/* 获取当前登录状态
* @method window.session.getLoginState
* @param 无
* @return {false|String} state|userInfo，未登录则返回false，已登录则返回对应的用户信息
*/
session.getLoginState = function () {
    var state = sessionStorage.getItem('loginState');
    if(state) {
        return JSON.parse(state);
    } else {
        return false;
    }
};

/* 修改当前登录状态
* @method window.session.setLoginState
* @param {false|String} state|userInfo，退出登录则输入false，设置登录账户则输入对应的用户信息
* @return 无
*/
session.setLoginState = function (userInfo) {
    if(userInfo !== false) {
        sessionStorage.setItem('loginState', JSON.stringify(userInfo));
    } else {
        sessionStorage.removeItem('loginState');
    }
};

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

function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

//读取cookies 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

//删除cookies 
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
} 
$(document).ready(function () {
    var $form = $('form');
    var $user = $form.find('#username');
    var $passwd = $form.find('#password');
    var $submit = $form.find('.login-submit');
    var serverurl = 'http://127.0.0.1/SCIEManagement';
    var sessionId;
    // 更新
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1/SCIEManagement/sessionId',
        // beforeSend: $.notice('提示！', '正在提交...', function () {
        //     user.loading($('.jq-notice-context'));
        // }),
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            console.log(data);
            var status = data.code;//状态码
            sessionId = data.sessionId;//状态码
            setCookie('isg',sessionId);
            $('.ver-img').attr('src', serverurl + '/kaptcha.jpg?sessionId=' + sessionId);
            
        }
    });
    $('.fa-refresh').on('click', function () {
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1/SCIEManagement/sessionId',
            // beforeSend: $.notice('提示！', '正在提交...', function () {
            //     user.loading($('.jq-notice-context'));
            // }),
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                console.log(data);
                var status = data.code;//状态码
                sessionId = data.sessionId;//状态码
                setCookie('isg',sessionId);
                $('.ver-img').attr('src', serverurl + '/kaptcha.jpg?sessionId=' + sessionId);
                
            }
        });
    })        

    $submit.on('click', function (event) {
        // 阻止默认跳转
        event.preventDefault();

        // 每次点击按钮时，读取用户名和密码
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
                console.log(data);
                
                // 登录成功
                if(data.status == 200) {
                    // 保存用户名
                    storage.username = data.username;

                    // 保存到sessionStorage中
                    session.setLoginState(storage);

                    $.notice("提示！", "登录成功，正在跳转...");
                    window.location.href = '../home/index/page.html';
                    
                    
                } else {
                    $.notice("提示！", "登录失败，请重新登录...");

                }
            }
        })
        
    });
});