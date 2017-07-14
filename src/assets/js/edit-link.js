$(document).ready(function () {
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
        // 验证
        validate(updateData);
        console.log(updateData);
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:80/SCIEManagement/category/add',
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
    $('#link-url').val(data.url);

}
function validate(ajaxArgs) {
    var rCheckSpace = /^\s+$/;
    if (rCheckSpace.test(ajaxArgs.title)) {
        alert("栏目名称不能为空！");
        return false;
    }
    if (rCheckSpace.test(ajaxArgs.url)) {
        alert("链接地址不能为空！");
        return false;
    }
}