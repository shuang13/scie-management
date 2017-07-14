$(document).ready(function () {
    var urlinfo = window.location.href;
    var groupId = urlinfo.split("?")[1].split("=")[1];
    var ajaxArgs = {
        group: groupId
    }
    $('.page-nav li a').removeClass();
    $('.page-nav li').eq(groupId - 1).find('a').addClass('nav-active');
    $.ajax({
            type: "POST",
            data: ajaxArgs,
            url: "http://127.0.0.1:80/SCIEManagement/config/manage/index",
            success: function(data){
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码
                if (status == 200) {
                    var aaData = data.config;
                    // 表格解析
                    parseTable(aaData);
                    
                    // 根据解析的结果，绘制表格
                    drawTable(window.formdata);
    
                    // 绑定操作事件
                    bindOperationEvent();
    
                    window.data = data;
                    console.log(window.formdata);
                }
            }
        });
    
});
// 解析表格数据
function parseTable(data) {
    window.formdata = [];
    for(var i = 0; i < data.length; i++) {
        window.formdata.push({
            "sort": '<input class="tb-40-wh" type="text" value="' + 
                        data[i].sort + 
                    '">',
            "name": data[i].name,
            "title": data[i].title,
            "group": data[i].group,
            "type": data[i].type,
            "operate": '<a class="btn" href="edit-system.html?id=' + data[i].id + '">' +
                        '<i class="fa fa-edit"></i>编辑</a>' +
                        '<a class="btn btn-delete" href="##">' + 
                        '<i class="fa fa-remove"></i>删除</a>',
        });
    }
    
}
// 绘制表格
function drawTable (data, callback) {
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
function bindOperationEvent() {
    $('.btn-delete').on('click', function (event) {
        event.preventDefault();
        var $this = $(this);
        var id = $this.closest('tr').attr('data-id');
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:80/SCIEManagement/category/delete",
            data: id,
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码
                if (status == 200) {
                    var aaData = data.category.category;
                    // 表格解析
                    parseTable(aaData);
                    
                    // 根据解析的结果，绘制表格
                    drawTable(window.formdata);
                    window.data = data;
                }
            }
        });
    })
}