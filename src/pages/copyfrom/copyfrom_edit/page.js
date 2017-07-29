require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');

var user = {}; //全局对象

// 更新数据
user.update = function(data) {
    $('#copyfrom-title').val(data.title);
    
    console.log(data.title);
    $('#copyfrom-url').val(data.url);

}
// 表单验证
user.validate = function(ajaxArgs) {
    var rCheckSpace = /^\s+$/;
    if (rCheckSpace.test(ajaxArgs.title)) {
        $.notice("提示！","栏目名称不能为空！");
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
            title: $('#copyfrom-title').val(),
            url:  $('#copyfrom-url').val(),
    };
    // 验证
    user.validate(updateData);
    console.log(updateData);
    // 更新
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8080/SCIEManagement/copyfrom/update',
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
        url: "http://127.0.0.1:80/SCIEManagement/copyfrom/find",
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;//状态码
                console.log(data);

            if (status == 200) {
                var aaData = data.copyfroms.copyfrom;

                user.update(aaData);
                console.log(aaData);

            }
            else $.notice("提示！","服务器连接失败!");
        }
    });

    // 文件上传
    $('#doc-cover').on('change', user.fileUpload);
    // 表单提交
    $('.btn-submit').on('click', user.submit);
   
});

