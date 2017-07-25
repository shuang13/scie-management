require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');
$(document).ready(function () {
    $('#doc-cover').filestyle({buttonText: "浏览"});
    
    // 获取栏目信息
    $.post('http://127.0.0.1:80/SCIEManagement/category/manage', function (data) {
        if(typeof data === 'string') {
            data = JSON.parse(data);
        }
        var status = data.code;//状态码
        if (status == 200) {
            var aaData = data.category.category;
            console.log(aaData);
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
        else alert("服务器连接失败");
    });

    

    // 文件上传
    $('#doc-cover').on('change', function (event) {
                console.log(0);

        $.ajaxFileUpload({
            url: 'http://127.0.0.1:80/SCIEManagement/file/category/upload',
            secureuri: false,
            fileElementId: 'doc-cover',
            dataType: 'json',
            success: function (data) {
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                console.log(data);

            }
        }); 
    });

    // 提交创建
    $('.btn-submit').on('click', function (event) {
        event.preventDefault();
        var ajaxArgs = {
            pid: $('#pid').val(),
            title: $('#doc-title').val(),
            url: $('#link-url').val(),
            type: "link"
        };
        console.log(ajaxArgs);
        var titleCheck = /[^x00-xff]/;
        console.log(titleCheck.test(ajaxArgs.title));
        if (!titleCheck.test(ajaxArgs.title)) {
            alert("栏目名称为中文，且不能为空！");
            return false;
        }
        
        var rCheckSpace = /^\s+$/;
        if (rCheckSpace.test(ajaxArgs.url)) {
            alert("内容不能为空！");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:80/SCIEManagement/category/add/url',
            data: ajaxArgs,
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码

                if(status == 200) {
                    alert("提交成功！");
                    location.reload();
                } else {
                    alert("提交失败，无法连接服务器！");
                }
            }
        });
    });
});

// var loading = {
//     state: false,
//     start: function (title) {
//         $.notice(title, '<div style="text-align:center;">文件上传中...</div><img style="display:block;width:150px;margin:30px auto 0 auto;' +
//             'border-radius:10px;" src="image/loading.gif" />');
//     },
//     stop: $.closeNotice
// };