require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');

var user = {}; //全局对象

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

// 提交创建
user.submit = function (event) {
    event.preventDefault();
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    var updateData = {
        id: id,
        username: $('#username').val(),
        realname: $('#realname').val(),
        email: $('#email').val(),
        role_id: $('#role-id').val(),
        password: $('#password').val(),
        repeat_password: $('#repeat-password').val(),
        realname: $('#realname').val()
    };
    // 验证
    user.validate(updateData);
    console.log(updateData);
    // 更新
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:80/SCIEManagement/admin/manage/admin',
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
                setTimeout('window.location.href = "../index/page.html"',2000); 
            } else {
                $('.jq-notice-context').html('提交失败!');
            }
        }
    });

}
// 加载图标
user.loading = function (element) {
    var loadingHtml = '<div id="loading" style="background:url(../../../public-resource/imgs/loading.gif) no-repeat;"></div>';
    element.html(loadingHtml);
}

$(document).ready(function () {
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    // 侧栏添加active
    $('.side-nav li').eq(0).find('a').addClass('active');
    var ajaxArgs = {
        id: id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:80/SCIEManagement/admin/find/info",
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

