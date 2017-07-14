$(document).ready(function () {
    $('#doc-cover').filestyle({buttonText: "浏览"});
    // 富文本编辑器
    KindEditor.ready(function(K) {
                window.editor = K.create('#editor_id');
        });
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

    

    // // 文件上传
    // $('#doc-cover').on('click', function (event) {
    //     event.preventDefault();

    //     var $file = $(this).siblings('input');
    //     var $dataArea = $file.parent().siblings('input');
    //     var uploadFileId = $file.attr('id');
    //     var fileType = $file.parent().siblings('label').html();
    //     var uploadUrl ='../index.php/site_manage/' +
    //                  (fileType === 'tracert结果截图' ? 'file_upload' : 'dom_upload');

    //     if($file[0].files.length < 1) {
    //         $.notice('工单创建提示：', '请选择至少一个' + fileType);
    //         return;
    //     }

    //     loading.start(fileType + '上传提示：');

    //     $.ajaxFileUpload({
    //         url: uploadUrl,
    //         secureuri: false,
    //         fileElementId: uploadFileId,
    //         dataType: 'json',
    //         success: function (data) {
    //             if(typeof data === 'string') {
    //                 data = JSON.parse(data);
    //             }

    //             window.data = data;

    //             $dataArea.val(data.path);
    //             $.notice( fileType + '上传提示：', '上传成功！');
    //         }
    //     }); 
    // });

    // 提交创建
    $('.btn-submit').on('click', function (event) {
        event.preventDefault();
        // 富文本编辑器
        editor.sync();
        var ajaxArgs = {
            model_id: $('#model-id').val(),
            pid: $('#pid').val(),
            title: $('#doc-title').val(),
            name: $('#doc-name').val(),
            type: "doc",
            content: $('#editor_id').val(),
            display: $('input[name="display"]:checked').val(),
            nav: $('input[name="nav"]:checked').val(),
            publish: $('input[name="publish"]:checked').val(),
            comment: $('input[name="comment"]:checked').val(),
            check_level: $('#check-level').val(),
            template_index: $('#template-index').val(),
            template_list: $('#template-list').val(),
            template_detail: $('#template-detail').val(),
            meta_title: $('#meta-title').val(),
            meta_keywords: $('#meta-keywords').val(),
            meta_description: $('#meta-description').val()
        };
        console.log(ajaxArgs);
        var titleCheck = /[^x00-xff]/;
        console.log(titleCheck.test(ajaxArgs.title));
        if (!titleCheck.test(ajaxArgs.title)) {
            alert("栏目名称为中文，且不能为空！");
            return false;
        }
        var nameCheck = /^[a-zA-Z]{3,7}$/;
        if (!nameCheck.test(ajaxArgs.name)) {
            alert("英文名称为英文，且不能为空！");
            return false;
        }
        var rCheckSpace = /^\s+$/;
        if (rCheckSpace.test(ajaxArgs.content)) {
            alert("内容不能为空！");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:80/SCIEManagement/category/add',
            data: ajaxArgs,
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码

                if(status == 200) {
                    alert("提交成功！");
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