var user = require('../../commons/common.js');
var my_id = user.session.getUserId;

// 表单提交
user.submit = function () {
    event.preventDefault();

    var ajaxArgs = {
        my_id: my_id,
        username: $('#username').val(),
        realname: $('#realname').val(),
        email: $('#email').val(),
        role_id: $('#role-id').val(),
        password: $('#password').val(),
        repeat_password: $('#repeat-password').val(),
        realname: $('#realname').val()
    };
    console.log(ajaxArgs);
    
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
            console.log(data);
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            console.log(status);
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
    if (rCheckSpace.test(ajaxArgs.username)) {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if (rCheckSpace.test(ajaxArgs.realname)) {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if (rCheckSpace.test(ajaxArgs.email)) {
        $.notice("提示！", "内容不能为空！");
        return false;
    }        
    if (rCheckSpace.test(ajaxArgs.role_id)) {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if (rCheckSpace.test(ajaxArgs.password)) {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if (rCheckSpace.test(ajaxArgs.repeat_password)) {
        $.notice("提示！", "内容不能为空！");
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

