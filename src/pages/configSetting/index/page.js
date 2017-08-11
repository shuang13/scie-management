var user = require('../../commons/common.js');
// 解析数据
user.parseData = function(data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {

        formdata.push({
            "id": data[i].id,
            "name": data[i].name,
            "type": data[i].type,
            "value": user.updateValue(data[i].type, i),
            "title": data[i].title
        });
    }
    return formdata;
}
user.updateValue = function (type, i) {
    var str = '';
    switch(type) {
        case 'number':
            str = '<div class="option"><input type="text" class="system-value"></div>';
            break;
        case 'text':
            str = '<div class="option"><input type="text" class="system-value"></div>';
            break;
        case 'textarea':
            str = '<div class="option"><textarea name="system-value" class="system-value"></textarea></div>'
            break;
        case 'boolean':
            str = '<div class="option"><label for="nav-t">是</label>' +
                '<input type="radio" class="system-value-t" name="system-value' + i + '" value="1">' +
                '<label for="nav-f">否</label>' +
                '<input type="radio" class="system-value-f" name="system-value' + i + '" value="0"></div>'
            break;
        case 'array':
            str = '<div class="option"><textarea name="system-value" class="system-value"></textarea></div>'
            break;
    }

    return str;
}
// 更新数据
user.update = function(data) {
    for (var i = 0; i < data.length; i++) {
        $('.option').eq(i).find('input[type=text]').val(data[i].value);
        $('.option').eq(i).find('textarea').val(data[i].value);
        if (data[i].type == 'boolean') {
            if (data[i].value == 1) {
                $('.option').eq(i).find('input[type=radio]').eq(0).attr("checked", "checked");
            }
            else {
                $('.option').eq(i).find('input[type=radio]').eq(1).attr("checked", "checked");
            }
        }
    }
}
// 绘制表格
user.drawTable = function(data) {
    var $frag = $(document.createDocumentFragment());
    var $table = $('table');
    var $ths = $table.find('th');

    for(var i = 0; i < data.length; i++) {
        var $tr = $('<tr data-id="' + data[i].id + '"></tr>');
        for(var j = 0; j < $ths.length; j++) {
            $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');
        }
        $frag.append($tr);
    }
    $table.find('tbody').empty().append($frag);
};
// 绑定操作事件
user.delete = function(event) {
    event.preventDefault();
    var urlinfo = window.location.href;
    var groupId = urlinfo.split("?")[1].split("=")[1];
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
                    id: $this.closest('tr').attr('data-id'),
                    group: groupId
                }
                $.ajax({
                    type: "POST",
                    url: user.SERVER_URL + '/config/manage/delete',
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
// 提交创建
user.submit = function (event) {
    event.preventDefault();
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var group = urlinfo.split("?")[1].split("=")[1];
    var length = $('.system-value').length;
    var system_value = [];
    console.log($('.system-value'));

    for (var i = 0; i < length; i++) {

        if (user.aaData[i].type == 'boolean') {
            system_value.push({
                id: $('input[name="system-value' + i + '"]:checked').parent().parent().parent().attr('data-id'),
                value:  $('input[name="system-value' + i + '"]:checked').val()
            });
        }
        system_value.push({
            id: $('.system-value').eq(i).parent().parent().parent().attr('data-id'),
            value: $('.system-value').eq(i).val()
        });
        console.log($('.system-value').eq(i).parent().parent().parent().attr('data-id'));
    }
    console.log(system_value);

    var updateData = {
        group: group,
        values: system_value
    };
    // 验证
    // user.validate(updateData);
    console.log(updateData);
    // 更新
    $.ajax({
        type: 'POST',
        url: user.SERVER_URL + '/config/set/inex',
        dataType:"json",
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
    var urlinfo = window.location.href;
    var groupId = urlinfo.split("?")[1].split("=")[1];
    var ajaxArgs = {
        group: groupId
    };
    $('.page-nav li a').removeClass();
    $('.page-nav li').eq(groupId - 1).find('a').addClass('nav-active');
    // 侧栏添加active
    $('.side-nav li').eq(2).find('a').addClass('active');
    $.ajax({
        type: "POST",
        beforeSend: user.loading($('tbody')),
        data: ajaxArgs,
        url: user.SERVER_URL + '/config/set/index',
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if (status == 200) {
                // 获取原始数据
                var aaData = data.configs.config;
                console.log(data);
            
                // 数据解析
                var new_data = user.parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                user.drawTable(new_data);
                user.update(aaData);
                user.aaData = aaData;
                // 栏目删除
                $('.btn-delete').on('click', user.delete);
                
                // 表单提交
                $('.btn-submit').on('click', user.submit);
                
            }
        }
    });

});