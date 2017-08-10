var user = require('../../commons/common.js');
// 当前管理员id
var my_id = user.session.getUserId;

// 解析数据
user.parseData = function(data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        var newDate = new Date(data[i].updated_at);
        formdata.push({
            "id": data[i].id,
            "title": data[i].title,
            "view_count": data[i].view_count,
            "cid": data[i].cid,
            "updated_at": newDate.toLocaleDateString(),
            "operate": '<a class="btn-edit" href="../doc_edit/page.html?id=' + data[i].id + '">' +
                        '<i class="fa fa-edit"></i>编辑</a>' +
                        '<a class="btn-delete" href="##">' + 
                        '<i class="fa fa-remove"></i>删除</a>',
        });
    }


    return formdata;
};
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
                var topID = [];
                var top = [];
                // 表格解析
                var str = '<option id="all-cid" value="" selected="selected">==全部==</option>';
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
                            aaData[top[i]].title + '(' +
                            aaData[top[i]].doc_count + ')' +
                        '</option>';
                    for(var j = 0; j < aaData.length; j++) {
                        // 栏目名称分级显示
                        if (aaData[j].pid == topID[i]) {
                            str +=  '<option value="' +
                            aaData[j].id +
                                '">|--' +
                            aaData[j].title + '(' +
                            aaData[j].doc_count + ')' +
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
// 通过标题查询
user.search = function () {
    var ajaxArgs = {
        target: $('#search-sort').val(),
        cid: $('#search-cid').val(),
        title: $('#search-title').val(),
    };

    $.ajax({
        type: "POST",
        beforeSend: user.loading($('tbody')),
        url: user.SERVER_URL + '/article/order/target',
        data: ajaxArgs,
        success: function (data) {
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if (status == 200) {
                // 获取原始数据
                var aaData = data.articles.article;
                // 数据解析
                var new_data = user.parseData(aaData);
                // 获取表格页数
                var pageNum = data.articles.pageNum;
                // 解除分页上所有事件
                $('#pagination').unbind();     
                // 根据页数，绘制分页栏
                user.pagination(pageNum);                
                // 根据解析的结果，重新绘制表格
                user.drawTable(new_data);
                // 重新绑定栏目删除事件
                $('.btn-delete').on('click', user.delete);
            }
        }
    });
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
    var $this = $(this);
    // 删除确认弹框
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
                };
                console.log(ajaxArgs);
                $.ajax({
                    type: "POST",
                    url: user.SERVER_URL + "/article/manage/delete",
                    beforeSend: user.loading($('.jq-notice-context')),
                    data: ajaxArgs,
                    success: function (data) {
                        if(typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                        var status = data.code;//状态码
                        if (status == 200) {
                            $('.jq-notice-context').html('删除成功!');
                            // 一秒后自动刷新页面
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
// 上级栏目id转换为上级栏目title
user.converCid = function (cid) {
    var title;
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
                for(var i = 0; i < aaData.length; i++) {
                    if (aaData[i].id == cid) {
                        title = aaData[i].title;
                    }
                }
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
    return title;
}
// 分页
user.pagination = function (totalPage) {
    $("#pagination").pagination({
        currentPage: 1,
        totalPage: totalPage,
        callback: function(current) {
            var ajaxArgs = {
                target: $('#search-sort').val(),
                cid: $('#search-cid').val(),
                title: $('#search-title').val(),
                page: current,
                row: 10
            };
            $.ajax({
                type: "POST",
                beforeSend: user.loading($('tbody')),
                url: user.SERVER_URL + '/article/order/target',
                data: ajaxArgs,
                success: function (data) {
                    if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;//状态码
                    if (status == 200) {
                         // 获取原始数据
                        var aaData = data.articles.article;
                    
                        // 数据解析
                        var new_data = user.parseData(aaData);
                        // 根据解析的结果，绘制表格
                        user.drawTable(new_data);
                        // 事件重新绑定栏目删除
                        $('.btn-delete').on('click', user.delete);
        
                    }
                }
            });
        }
    });
}
$(document).ready(function () {
    // 侧栏添加active
    $('.side-nav li').eq(5).find('a').addClass('active');
    // 表单初始化
    user.formInit();
    
    // $("#pagination").pagination();

    // 默认排序为发布时间,绘制表格
    var ajaxArgs = {
        target: $('#search-sort').val(),
        cid: $('#search-cid').val(),
        title: $('#search-title').val()
    };
    console.log(ajaxArgs);
    $.ajax({
        type: "POST",
        beforeSend: user.loading($('tbody')),
        url: user.SERVER_URL + '/article/order/target',
        data: ajaxArgs,
        success: function (data) {
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if (status == 200) {
                // 获取原始数据
                var aaData = data.articles.article;
                // 获取表格页数
                var pageNum = data.articles.pageNum     
                // 数据解析
                var new_data = user.parseData(aaData);
                // 根据解析的结果，绘制表格
                console.log(aaData);
                user.drawTable(new_data);
                // 根据页数，绘制分页栏
                user.pagination(pageNum);
                // $('.ui-pagination-page-item').eq(0).trigger("click");
                // 绑定栏目删除事件
                $('.btn-delete').on('click', user.delete);
                // // 绑定通过标题查询事件
                $('.btn-search').on('click', user.search);
            }
        }
    });


});