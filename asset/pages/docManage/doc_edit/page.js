var user = require('../../commons/common.js');

// 表单初始化
user.formInit = function (initData) {
    // 选择栏目
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
                var topID = [];
                var top = [];
                // 表格解析
                var str = '<option value="0" selected="selected">==请选择栏目==</option>';
                for(var i = 0; i < aaData.length; i++) {
                    // 栏目名称分级显示
                    if (aaData[i].pid == 0) {
                        topID.push(aaData[i].id);
                        top.push(i);
                    }        
                }
                for (var i = 0; i < topID.length; i++) {
                    str +=  '<option value="' +
                            aaData[top[i]].id +
                        '">' +
                            aaData[top[i]].title +
                        '</option>';
                    for(var j = 0; j < aaData.length; j++) {
                        // 栏目名称分级显示
                        if (aaData[j].pid == topID[i]) {
                            str +=  '<option value="' +
                            aaData[j].id +
                                '">|--' +
                            aaData[j].title +
                            '</option>';
                        }        
                    }
                }
                $('#cate-select').html(str);
                user.update(initData);

            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
    // 选择来源
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/copyfrom/index',
        success: function(data){
            if(typeof data === 'string') {
            data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                var aaData = data.copyfroms.copyfrom;

                // 表格解析
                var str = '<option selected="selected">==请选择栏目==</option>' + 
                '<option value="0" >原创</option>';
                
                for (var i = 0; i < aaData.length; i++) {
                    str +=  '<option value="' +
                            aaData[i].title +
                        '">' +
                            aaData[i].title +
                        '</option>';
                }

                $('#copyfrom-select').html(str);
                user.update(initData);

            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
}
function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1);  
}
// 文件上传
user.fileUpload = function () {
    var filename = getFileName($('#file-cover').val());
    $.ajaxFileUpload({
        url: user.SERVER_URL + '/file/article/upload',
        secureuri: false,
        fileElementId: 'file-cover',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        dataType: 'json',
        success: function (data) {
            $('.jq-notice-context').html('上传成功!');
            setTimeout('$.closeNotice()',2000); 
            $('.cover-img').attr('src', 'C:/Users/1234/Downloads/软件/apache-tomcat-7.0.75/apache-tomcat-7.0.75/webapps/SCIEManagement/upload/' + filename);
            console.log(filename);
            $("#file-cover").replaceWith('<input type="file" id="file-cover" name="file-cover" title="">');
            $("#file-cover").attr('title', filename);
            $('#file-cover').on('change', user.fileUpload);

        }
    }); 
}
// 表单提交
user.submit = function () {
    event.preventDefault();
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    text = $("input:checkbox[name='position']:checked").map(function(index,elem) {
        return $(elem).val();
    }).get().join('0');
    console.log("选中的checkbox的值为：" + text);
    var ajaxArgs = {
        cid: $('#cate-select').val(),
        id: id,
        position: text,
        title: $('#title').val(),
        keywords: $('#keywords').val(),
        description: $('#description').val(),
        copyfrom: $("#copyfrom-select").val(),
        content: $('#editor_id').val(),
    };
    if(!user.validate(ajaxArgs)) {
        return false;
        
    }
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/article/manage/update',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            user.loading($('.jq-notice-context'));
        }),
        data: ajaxArgs,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
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
// 更新数据
user.update = function(data) {
    var p = data.position.toString();
 
    if (p.indexOf("1") >= 0) {
    console.log(1);

        $('input[name="position"]').eq(0).attr("checked", "checked");
    }
    if (p.indexOf("2") >= 0) {
    console.log(2);

        $('input[name="position"]').eq(1).attr("checked", "checked");
    }
    if (p.indexOf("4") >= 0) {
        $('input[name="position"]').eq(2).attr("checked", "checked");
    }
    for (var i = 0; i < $('#cate-select option').length; i++) {
        if ($('#cate-select option').eq(i).val() == data.cid) {
            $('#cate-select option').eq(i).attr("selected", "selected");
        }

    }
    for (var i = 0; i < $('#copyfrom-select option').length; i++) {
        if ($('#copyfrom-select option').eq(i).val() == data.copyfrom) {
            $('#copyfrom-select option').eq(i).attr("selected", "selected");
        }

    }

    $('#title').val(data.title);
    $('#keywords').val(data.keywords);
    $('#description').val(data.description);
    editor.html(data.content);

}
// 表单验证
user.validate = function (ajaxArgs) {
    var titleCheck = /[^x00-xff]/;
    console.log(titleCheck.test(ajaxArgs.title));
    if (!titleCheck.test(ajaxArgs.title)) {
        $.notice("提示！", "栏目名称为中文，且不能为空！");
        return false;
    }
    var nameCheck = /^[a-zA-Z]{3,7}$/;
    if (!nameCheck.test(ajaxArgs.name)) {
        $.notice("提示！", "英文名称为英文，且不能为空！");
        return false;
    }
    if ($.trim(ajaxArgs.content) == '') {
        $.notice("提示！", "内容不能为空！");
        return false;
    }
    return true;
}
$(document).ready(function () {
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];
    // 富文本编辑器
    KindEditor.ready(function(K) {
        window.editor = K.create('#editor_id');
    });
    // 时间选择器初始化
    $("#time-pick").flatpickr({
        defaultDate: new Date()
    }); 
    
    // 侧栏添加active
    $('.side-nav li').eq(5).find('a').addClass('active');

    var ajaxArgs = {
        id: id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: user.SERVER_URL + '/article/manage/find',
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;
                console.log(data);

            if (status == 200) {
                var Doc = data.article;
                user.formInit(Doc);
               
            }
        else $.notice("提示！","服务器连接失败!");
        }
    });
    // 文件上传
    $('#file-cover').on('change', user.fileUpload);
    // 表单提交
    $('.btn-submit').on('click', user.submit);
});

