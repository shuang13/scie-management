$(document).ready(function () {
    // 获取编辑文字id
    var urlinfo = window.location.href;
    var id = urlinfo.split("?")[1].split("=")[1];

    var ajaxArgs = {
        id: id
    }
    // 获取栏目信息
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1/SCIEManagement/config/manage/find",
        data: ajaxArgs,
        success: function (data) {
            var status = data.code;//状态码
                console.log(data);

            if (status == 200) {
                var DData = data.config;
                update(DData);
                console.log(DData);
            }
        else alert("服务器连接失败!");
        }
    });
});
function update(data) {
    console.log(data);
    $('#system-name').val(data.name);
    $('#system-title').val(data.title);
    $('#system-type').eq(data.type).attr("selected", "selected");
    $('#system-group').eq(data.group).attr("selected", "selected");
    $('#system-value').val(data.value);
    $('#system-remark').val(data.remark);
    var rCheckSpace = /^\s+$/;
    if (rCheckSpace.test(ajaxArgs.content)) {
        alert("内容不能为空！");
        return false;
    }

}