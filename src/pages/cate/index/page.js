var user = require('../../commons/common.js');
// 解析数据
user.parseData = function(data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        formdata.push({
            "sort": '<input class="tb-40-wh" type="text" value="' + 
                        data[i].sort + 
                    '">',
            "id": data[i].id,
            "title": user.addPrefix(data[i].title, data[i].pid),
            "type": data[i].type,
            "model_id": data[i].model_id,
            "pid": data[i].pid,
            "doc_count": data[i].doc_count,
            "display": user.convertBooleanIcon(data[i].display),
            "nav": user.convertBooleanIcon(data[i].nav),
            "operate": '<a class="btn-edit" href="../edit_' + data[i].type + '/page.html?id=' + data[i].id + '">' +
                        '<i class="fa fa-edit"></i>编辑</a>' +
                        '<a class="btn-delete" href="##">' + 
                        '<i class="fa fa-remove"></i>删除</a>',
        });
    }
    return formdata;
}
// 表单初始化
user.formInit = function () {
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/category/manage',
        success: function(data){
            if(typeof data === 'string') {
            data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if (status == 200) {
                var aaData = data.category.category;
                console.log(aaData);
                var top = [];
                // 表格解析
                var str = '<option value="0" selected="selected">==全部==</option>';
                for(var i = 0; i < aaData.length; i++) {
                    // 栏目名称分级显示
                    if (aaData[i].pid == 0) {
                        top.push(aaData[i].id);
                    }        
                }
                for (var i = 0; i < top.length; i++) {
                    str +=  '<option value="' +
                            aaData[i].id +
                        '">' +
                            aaData[i].name +
                        '</option>';
                    for(var j = 0; j < aaData.length; j++) {
                        // 栏目名称分级显示
                        if (aaData[j].pid == top[i]) {
                            str +=  '<option value="' +
                            aaData[j].id +
                                '">|--' +
                            aaData[j].name +
                            '</option>';
                        }        
                    }
                }
                $('#search-cid').html(str);
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
}
// 绘制表格
user.drawTable = function(data) {
    var $frag = $(document.createDocumentFragment());
    var $table = $('table');
    var $ths = $table.find('th');
    var top = [];
    var topID = [];
 
    for(var i = 0; i < data.length; i++) {
        // 栏目名称分级显示
        if (data[i].pid == 0) {
            topID.push(data[i].id);
            top.push(i);
        }        
    }
    for (var i = 0; i < topID.length; i++) {
        var $tr = $('<tr data-id="' + topID[i] + '"></tr>');
        for(var t = 0; t < $ths.length; t++) {
            $tr.append('<td>' + data[top[i]][$ths.eq(t).attr('data-name')] + '</td');
        }
        $frag.append($tr);
        for(var j = 0; j < data.length; j++) {
            // 栏目名称分级显示
            if (data[j].pid == topID[i]) {
                var $tr = $('<tr data-id="' + data[j].id + '"></tr>');
                for(var t = 0; t < $ths.length; t++) {
                    $tr.append('<td>' + data[j][$ths.eq(t).attr('data-name')] + '</td');
                }
                $frag.append($tr);
            }        
        }
    }
    $table.find('tbody').empty().append($frag);
};
// 绑定操作事件
user.delete = function(event) {
    event.preventDefault();
    var $this = $(this);
    $.notice('提示！', [
        '<div class="discription_dialog">是否删除此栏目!</div>',
        '<div class="divOperation">',
            '<span class="true btn btn-danger">确认</span>',
            '<span class="false btn btn-default">取消</span>',
        '</div>'
        ].join(''),
        function () {
            var $context = $('.jq-notice-context');
            $context.find('.true').on('click', function (event) {
                event.preventDefault();
                // 参数
                var ajaxArgs = {
                    id: $this.closest('tr').attr('data-id')
                }
                $.ajax({
                    type: "POST",
                    url: user.SERVER_URL + "/category/delete",
                    beforeSend: user.loading($('.jq-notice-context')),
                    data: ajaxArgs,
                    success: function (data) {
                        if(typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                        var status = data.code;//状态码
                        if (status == 200) {
                            $('.jq-notice-context').html('删除成功!');
                            setTimeout("location.reload()",1000); 
                        }
                    }
                });    
                
            });
            $context.find('.false').on('click', function () {
                $.closeNotice();
            });
        }
    );
    
}
// 数值转换为勾叉图标
user.convertBooleanIcon = function (data) {
    if (data == 1) {
        return '<i class="fa fa-check"></i>';
    }
    else return '<i class="fa fa-remove"></i>';
}
// 栏目名称分级显示,子栏目加|--
user.addPrefix = function (name, pid) {
    if (pid != 0) {
        name = "&nbsp&nbsp|--" + name;
    }
    return name;
}

$(document).ready(function () {
    // 侧栏添加active
    $('.side-nav li').eq(0).find('a').addClass('active');
    $.ajax({
        type: "POST",
        beforeSend: user.loading($('tbody')),
        url: user.SERVER_URL + "/category/manage",
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if (status == 200) {
                // 获取原始数据
                var aaData = data.category.category;
                console.log(aaData);
            
                // 数据解析
                var new_data = user.parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                user.drawTable(new_data);
                
                // 栏目删除
                $('.btn-delete').on('click', user.delete);
                

                
            }
        }
    });
});