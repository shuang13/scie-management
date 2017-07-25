require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');

$(document).ready(function () {
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    $('#doc-cover').filestyle({buttonText: "浏览"});
    // 富文本编辑器
    KindEditor.ready(function(K) {
                window.editor = K.create('#editor_id');
        });

    var ajaxArgs = {
        id: id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:80/SCIEManagement/category/find",
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;//状态码
                console.log(data);

            if (status == 200) {
                var Doc = data.category;
                update(Doc);
                window.Doc = Doc;
                console.log(Doc);
            }
        else alert("服务器连接失败!");
        }
    });

    $.post('http://127.0.0.1:80/SCIEManagement/category/manage', function (data) {
        if(typeof data === 'string') {
            data = JSON.parse(data);
        }
        var status = data.code;//状态码
        if (status == 200) {
            var aaData = data.category.category;
            console.log(aaData);
            // 表格解析
            var str = '<option value="0" >作为一级栏目</option>';
            for(var i = 0; i < aaData.length; i++) {
                // 栏目名称分级显示
                if (aaData[i].pid == 0) {
                    if (window.Doc.pid == aaData[i].id) {
                        str +=  '<option selected="selected" value="' +
                        aaData[i].id +
                        '">' +
                        aaData[i].name +
                        '</option>';
                    }
                    else if (window.Doc.pid == 0) {
                        str +=  '<option value="' +
                        aaData[i].id +
                        '">' +
                        aaData[i].name +
                        '</option>';
                    }
                    
                }        
            }
            $('#pid').html(str);
        }
        else alert("服务器连接失败");
    });
     // 提交创建
    $('.btn-submit').on('click', function (event) {
        event.preventDefault();
        // 富文本编辑器
        editor.sync();
        var updateData = {
            id: id,
            pid: $('#pid').val(),
            title: $('#doc-title').val(),
            name: $('#doc-name').val(),
            type: "page",
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
        // 验证
        validate(updateData);

        console.log(updateData);

        // 更新
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:80/SCIEManagement/category/test/update',
            data: updateData,
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码
                console.log(data);
                if(status == 200) {
                    alert("提交成功！");
                } else {
                    alert("提交失败，无法连接服务器！");
                }
            }
        });

    });
});
function update(data) {
    console.log(data);
    $('#doc-title').val(data.title);
    $('#doc-name').val(data.name);
    // 是否显示栏目
    if (data.display == 1) {
        $('input[name="display"]').eq(0).attr("checked", "checked");
    }
    else $('input[name="display"]').eq(1).attr("checked", "checked");
    // 是否显示导航
    if (data.nav == 1) {
        $('input[name="nav"]').eq(0).attr("checked", "checked");
    }
    else $('input[name="nav"]').eq(1).attr("checked", "checked");
    // 是否允许投稿
    if (data.publish == 1) {
        $('input[name="publish"]').eq(0).attr("checked", "checked");
    }
    else $('input[name="publish"]').eq(1).attr("checked", "checked");
    // 是否允许评论
    if (data.comment == 1) {
        $('input[name="comment"]').eq(0).attr("checked", "checked");
    }
    else $('input[name="comment"]').eq(1).attr("checked", "checked");
    // 审稿
    $('#check-level option').eq(data.check_level).attr("selected", "selected");
    $('#meta-title').val(data.meta_title);
    $('#meta-keywords').val(data.meta_keywords);
    $('#meta-description').val(data.meta_description);
    editor.html(data.content);

}
function validate(ajaxArgs) {
    var titleCheck = /[^x00-xff]/;
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
}