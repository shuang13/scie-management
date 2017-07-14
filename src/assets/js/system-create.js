$(document).ready(function () {
    // 提交创建
    $('.btn-submit').on('click', function (event) {
        event.preventDefault();
        var ajaxArgs = {
            name: $('#system-name').val(),
            title: $('#system-title').val(),
            type: $('#system-type').val(),
            group: $('#system-group').val(),
            value: $('#system-value').val(),
            remark: $('#system-remark').val(),
        };
        console.log(ajaxArgs);
        
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:80/SCIEManagement/category/add',
            data: ajaxArgs,
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;//状态码

                if(status == 200) {
                    alert("提交成功！");
                } else {
                    alert("提交失败，无法连接服务器！");
                }
            }
        });
    });
});

