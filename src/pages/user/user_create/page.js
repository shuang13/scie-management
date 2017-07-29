require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');
var user = {}; //全局对象

// 表单提交
user.submit = function () {
    event.preventDefault();
    var ajaxArgs = {
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
        url: 'http://127.0.0.1:80/SCIEManagement/admin/manage/add',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: ajaxArgs,
        success: function(data){
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
    return true;
}
// 加载图标
user.loading = function (element) {
    var loadingHtml = '<div id="loading" style="background:url(../../../public-resource/imgs/loading.gif) no-repeat;"></div>';
    element.html(loadingHtml);
}

$(document).ready(function () {
    // 侧栏添加active
    $('.side-nav li').eq(4).find('a').addClass('active');

    // 表单提交
    $('.btn-submit').on('click', user.submit);
});

