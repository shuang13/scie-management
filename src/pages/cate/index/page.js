require ('!style-loader!css-loader!sass-loader!../../../public-resource/css/components-dir/base.scss');
$(document).ready(function () {

    $.ajax({
            type: "POST",
            url: "http://127.0.0.1:80/SCIEManagement/category/manage",
            success: function(data){
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                    console.log("ff");
                
                var status = data.code;//状态码
                if (status == 200) {
                    var aaData = data.category.category;
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
        // 栏目名称分级显示
        var name = function () {
            var name = data[i].name;
                if (data[i].pid != 0) {
                    name = "&nbsp&nbsp|--" + data[i].name;
                }
                return name;
            };
        // 以图标形式显示
        var display = function () {
                if (data[i].display == 1) {
                    return '<i class="fa fa-check"></i>';
                }
                else return '<i class="fa fa-remove"></i>';
            };
        var nav = function () {
            if (data[i].nav == 1) {
                return '<i class="fa fa-check"></i>';
            }
            else return '<i class="fa fa-remove"></i>';
        };
        window.formdata.push({
            "sort": '<input class="tb-40-wh" type="text" value="' + 
                        data[i].sort + 
                    '">',
            "id": data[i].id,
            "name": name(),
            "type": data[i].type,
            "model_id": data[i].model_id,
            "pid": data[i].pid,
            "doc_count": data[i].doc_count,
            "display": display(),
            "nav": nav(),
            "operate": '<a class="btn-edit" href="../edit_' + data[i].type + '/page.html?id=' + data[i].id + '">' +
                        '<i class="fa fa-edit"></i>编辑</a>' +
                        '<a class="btn-delete" href="##">' + 
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
        var ajaxArgs = {
            id: $this.closest('tr').attr('data-id')
        }
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:80/SCIEManagement/category/delete",
            data: ajaxArgs,
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码
                if (status == 200) {
                    alert("删除成功！");
                    location.reload();
                }
            }
        });
    })
}