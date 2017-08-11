var user = require('../../commons/common.js');

// 更新数据
user.update = function(data) {
    $('#system-name').val(data.name),
    $('#system-value').val(data.value),
    $('#system-title').val(data.title),
    $('#system-remark').val(data.remark),
    $('#system-group option').eq(data.group - 1).attr("selected", "selected");
    var i;
    switch(data.type) {
        case 'number':
          i = 0;
          break;
        case 'text':
          i = 1;
          break;
        case 'textarea':
          i = 2;
          break;
        case 'boolean':
          i = 3;
          break;
        case 'array':
          i = 4;
          break;
    }
    $('#system-type option').eq(i).attr("selected", "selected");
}
// 表单验证
user.validate = function(ajaxArgs) {
    var rCheckSpace = /^\s+$/;
    if (rCheckSpace.test(ajaxArgs.title)) {
        $.notice("提示！","链接名称不能为空！");
        return false;
    }
    if (rCheckSpace.test(ajaxArgs.url)) {
        $.notice("提示！","链接地址不能为空！");
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
        group: $('#system-group').val(),
        name: $('#system-name').val(),
        value: $('#system-value').val(),
        title: $('#system-title').val(),
        remark: $('#system-remark').val(),
        type: $('#system-type').val(),
        sort:'1'
    };
    // 验证
    // user.validate(updateData);
    console.log(updateData);
    // 更新
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/config/manage/update',
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
                setTimeout('window.location.href = "../index/page.html?group=1"',2000); 
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
    $('.side-nav li').eq(3).find('a').addClass('active');
    var ajaxArgs = {
        id: id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: user.SERVER_URL + '/config/manage/find',
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;//状态码
                console.log(data);

            if (status == 200) {
                var aaData = data.config;

                user.update(aaData);
                console.log(data);

            }
            else $.notice("提示！","服务器连接失败!");
        }
    });

    // 表单提交
    $('.btn-submit').on('click', user.submit);
   
});

