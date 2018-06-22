var user = require('../../commons/common.js');
// 表单初始化
user.formInit = function () {
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/category/manage',
        success: function(data){
            if(typeof data === 'string') {
            data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                var aaData = data.category.category;
                // 表格解析
                var str = '<option value="0" selected="selected">作为一级栏目</option>';
                for(var i = 0; i < aaData.length; i++) {
                    // 栏目名称分级显示
                    if (aaData[i].pid == 0) {
                        str +=  '<option value="' +
                            aaData[i].id +
                        '">' +
                            aaData[i].name +
                        '</option>';
                    }        
                }
                $('#pid').html(str);
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
}
// 文件上传
user.fileUpload = function () {
    $.ajaxFileUpload({
        url: user.SERVER_URL + '/file/category/upload',
        secureuri: false,
        fileElementId: 'file-cover',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        dataType: 'json',
        success: function (data) {
            $('.jq-notice-context').html('上传成功!');
            setTimeout('$.closeNotice()',2000); 
        }
    }); 
}
// 表单提交
user.submit = function () {
    event.preventDefault();
    var ajaxArgs = {

        pid: $('#pid').val(),
        title: $('#doc-title').val(),
        url: $('#link-url').val(),
        type: "link",
        cover: $("#file-cover").val()

    };
    console.log(ajaxArgs);
    if(!user.validate(ajaxArgs)) {
        return false;
    }    
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/category/add/url',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: ajaxArgs,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;

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
    $('#file-cover').filestyle({buttonText: "浏览"});
    // 侧栏添加active
    $('.side-nav li').eq(0).find('a').addClass('active');    
    // 初始化
    user.formInit();
    // 文件上传
    $('#file-cover').on('change', user.fileUpload);
    // 表单提交
    $('.btn-submit').on('click', user.submit);
});

