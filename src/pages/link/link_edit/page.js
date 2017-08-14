var user = require('../../commons/common.js');

// 更新数据
user.update = function(data) {
    $('#link-title').val(data.title);
    
    console.log(data.title);
    $('#link-url').val(data.url);

}
// 表单验证
user.validate = function (ajaxArgs) {
    if ($.trim(ajaxArgs.title) == '') {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.url) == '') {
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
            title: $('#link-title').val(),
            url:  $('#link-url').val(),
            sort: 0
    };
    // 验证
    if(!user.validate(ajaxArgs)) {
        return false;
    }
    // 更新
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/link/update',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: updateData,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var message = data.message;

            var status = data.code;//状态码
            if(status == 200) {
                $('.jq-notice-context').html('提交成功!');
                setTimeout('window.location.href = "../index/page.html"',2000); 
            } else {
                $('.jq-notice-context').html('提交失败,' + message + '!');
            }
        }
    });

}
$(document).ready(function () {
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    // 侧栏添加active
    $('.side-nav li').eq(3).find('a').addClass('active');
    var ajaxArgs = {
        id: id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: user.SERVER_URL + '/link/find',
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;//状态码
                console.log(data);

            if (status == 200) {
                var aaData = data.link;

                user.update(aaData);
                console.log(data);

            }
            else $.notice("提示！","服务器连接失败!");
        }
    });

    // 表单提交
    $('.btn-submit').on('click', user.submit);
   
});

