var user = require('../../commons/common.js');

// 表单提交
user.submit = function () {
    event.preventDefault();

    var ajaxArgs = {
        my_id: user.my_id,
        username: $('#username').val(),
        realname: $('#realname').val(),
        email: $('#email').val(),
        role_id: $('#role-id').val(),
        password: $('#password').val(),
        repeat_password: $('#repeat-password').val(),
        realname: $('#realname').val()
    };
    
    if(!user.validate(ajaxArgs)) {
        return false;
    }
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/admin/manage/add',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: ajaxArgs,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if(status == 200) {
                $('.jq-notice-context').html('提交成功!');
                setTimeout('window.location.href = "../index/page.html"',2000); 
            } else {
                $('.jq-notice-context').html('提交失败!');
            }
        }
    });
}
// 表单验证
user.validate = function (ajaxArgs) {

    var rCheckSpace = /^\s+$/;
    if ($.trim(ajaxArgs.username) == '') {
        $.notice("提示！", "用户名不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.realname) == '') {
        $.notice("提示！", "真实姓名不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.email) == '') {
        $.notice("提示！", "邮箱不能为空！");
        return false;
    }

    if ($.trim(ajaxArgs.password) == '') {
        $.notice("提示！", "密码不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.repeat_password) == '') {
        $.notice("提示！", "确认密码不能为空！");
        return false;
    }
    if (ajaxArgs.repeat_password != ajaxArgs.password) {
        $.notice("提示！", "确认密码不一致！");
        return false;
    }
    return true;
}
$(document).ready(function () {

    // 侧栏添加active
    $('.side-nav li').eq(4).find('a').addClass('active');

    // 表单提交
    $('.btn-submit').on('click', user.submit);
});

