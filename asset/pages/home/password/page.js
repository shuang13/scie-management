var user = require('../../commons/common.js');

// 表单提交
user.submit = function () {
    event.preventDefault();
    var ajaxArgs = {
        my_username: user.my_username,
        my_password: $('#password').val(),
        my_new_password: $('#new_password').val(),
        my_repeat_new_password: $('#repeat_new_password').val()
    };
    if(!user.validate(ajaxArgs)) {
        return false;
    }
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/admin/update/password',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: ajaxArgs,
        success: function(data){

            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var message = data.message;

            var status = data.code;
            if(status == 200) {
                $('.jq-notice-context').html('提交成功!');
                setTimeout('window.location.href = "../index/page.html"',2000); 
            } else {
                $('.jq-notice-context').html('提交失败,' + message + '!');
            }
        }
    });
}
// 更新数据
user.update = function(data) {
    var lastTime = new Date(data.last_time);
    $('#username').html(data.username);
    $('#last-ip').html(data.last_ip);
    $('#last-time').html(lastTime.toLocaleString());
}
user.validate = function (ajaxArgs) {
    if ($.trim(ajaxArgs.my_password) == '') {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.my_new_password) == '') {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.my_repeat_new_password) == '') {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    return true;
}
$(document).ready(function () {
    var ajaxArgs = {
        my_id: user.my_id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: user.SERVER_URL + '/admin/find/info',
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;
            if (status == 200) {
                var aaData = data.admin;
                user.update(aaData);
            }
            else $.notice("提示！","服务器连接失败!");
        }
    });

    // 表单提交
    $('.btn-submit').on('click', user.submit);
});

