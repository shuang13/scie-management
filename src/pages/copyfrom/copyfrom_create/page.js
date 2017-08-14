var user = require('../../commons/common.js');

// 表单提交
user.submit = function () {
    event.preventDefault();
    var ajaxArgs = {
        title: $('#copyfrom-title').val(),
        url: $('#copyfrom-url').val(),
        sort:'1'
    };
    console.log(ajaxArgs);
    if(!user.validate(ajaxArgs)) {
        return false;
    }
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/copyfrom/add',
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
$(document).ready(function () {
    // 侧栏添加active
    $('.side-nav li').eq(3).find('a').addClass('active');

    // 表单提交
    $('.btn-submit').on('click', user.submit);
});

