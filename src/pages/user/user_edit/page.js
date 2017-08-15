var user = require('../../commons/common.js');
// 更新数据
user.update = function(data) {
    $('#username').val(data.username);
    $('#realname').val(data.realname);
    $('#role-id').val(data.role_id);
    $('#email').val(data.email);
    $('#password').val(data.password);
    $('#repeat-password').val(data.repeat_password);
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
// 提交创建
user.submit = function (event) {
    console.log();
    event.preventDefault();
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    var my_username = user.session.getLoginState();
    var updateData = {
        my_username: my_username,
        id: id,
        realname: $('#realname').val(),
        email: $('#email').val(),
        role_id: $('#role-id').val(),
        realname: $('#realname').val()
    };
    // 验证
    if(!user.validate(ajaxArgs)) {
        return false;
    }
    console.log(updateData);
    // 更新
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/admin/manage/admin',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: updateData,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            console.log(data);
            if(status == 200) {
                $('.jq-notice-context').html('提交成功!');
            } else {
                $('.jq-notice-context').html('提交失败!');
            }
        }
    });

}
$(document).ready(function () {
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    // 侧栏添加active
    $('.side-nav li').eq(5).find('a').addClass('active');
    var my_username = user.session.getLoginState();
    var ajaxArgs = {
        my_username: my_username,
        id: id,
        sort: '1'
     };
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: user.SERVER_URL + '/admin/manage/find',
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;//状态码
                console.log(data);

            if (status == 200) {
                var aaData = data.admin;

                user.update(aaData);
                console.log(aaData);

            }
            else $.notice("提示！","服务器连接失败!");
        }
    });

    // 表单提交
    $('.btn-submit').on('click', user.submit);
   
});

