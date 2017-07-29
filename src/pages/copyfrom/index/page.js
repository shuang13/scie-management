require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');

var user = {}; //全局对象
// 解析数据
user.parseData = function(data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        formdata.push({
            "id": data[i].id,
            "sort": '<input class="tb-40-wh" type="text" value="' + 
                        data[i].sort + 
                    '">',
            "title": data[i].title,
            "url": data[i].url,
            "operate": '<a class="btn-edit" href="../copyfrom_edit/page.html?id=' + data[i].id + '">' +
                        '<i class="fa fa-edit"></i>编辑</a>' +
                        '<a class="btn-delete" href="##">' + 
                        '<i class="fa fa-remove"></i>删除</a>',
        });
    }
    return formdata;
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
                    url: "http://127.0.0.1:80/SCIEManagement/copyfrom/delete",
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

// 加载图标
user.loading = function (element) {
    var loadingHtml = '<div id="loading" style="background:url(../../../public-resource/imgs/loading.gif) no-repeat;"></div>';
    element.html(loadingHtml);
}

$(document).ready(function () {
    // 侧栏添加active
    $('.side-nav li').eq(3).find('a').addClass('active');
    $.ajax({
        type: "POST",
        beforeSend: user.loading($('tbody')),
        url: "http://127.0.0.1:80/SCIEManagement/copyfrom/index",
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;//状态码
            if (status == 200) {
                // 获取原始数据
                var aaData = data.copyfroms.copyfrom;
                console.log(aaData);
            
                // 数据解析
                var new_data = user.parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                user.drawTable(new_data);
                
                // 栏目删除
                $('.btn-delete').on('click', user.delete);
                

                
                console.log(new_data);
            }
        }
    });
});