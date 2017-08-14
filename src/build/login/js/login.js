var session = {};
/* 获取当前登录状态
* @method window.session.getLoginState
* @param 无
* @return {false|String} state|userInfo，未登录则返回false，已登录则返回对应的用户信息
*/
session.getLoginState = function () {
    var state = sessionStorage.getItem('loginState');
    if(state) {
        return JSON.parse(state);
    } else {
        return false;
    }
};

/* 修改当前登录状态
* @method window.session.setLoginState
* @param {false|String} state|userInfo，退出登录则输入false，设置登录账户则输入对应的用户信息
* @return 无
*/
session.setLoginState = function (userInfo) {
    if(userInfo !== false) {
        sessionStorage.setItem('loginState', JSON.stringify(userInfo));
    } else {
        sessionStorage.removeItem('loginState');
    }
};


$(document).ready(function () {
    var $form = $('form');
    var $user = $form.find('#username');
    var $passwd = $form.find('#password');
    var $submit = $form.find('.login-submit');
    var serverurl = 'http://127.0.0.1/SCIEManagement';
    $('.ver-img').attr('src', serverurl + '/kaptcha.jpg');
    $('.fa-refresh').on('click', function () {
        $('.ver-img').attr('src', serverurl + '/kaptcha.jpg');
    })
    // 更新
    // $.ajax({
    //     type: 'GET',
    //     url: 'http://127.0.0.1/SCIEManagement/kaptcha.jpg',
    //     // beforeSend: $.notice('提示！', '正在提交...', function () {
    //     //     user.loading($('.jq-notice-context'));
    //     // }),
    //     success: function(data){
    //         if(typeof data === 'string') {
    //             data = JSON.parse(data);
    //         }
    //         console.log(data);
    //         var status = data.code;//状态码
    //         // if(status == 200) {
    //         //     $('.jq-notice-context').html('提交成功!');
    //         //     setTimeout('window.location.href = "../index/page.html"',2000); 
    //         // } else {
    //         //     $('.jq-notice-context').html('提交失败,' + message + '!');
    //         // }
    //     }
    // });
    $submit.on('click', function (event) {
        // 阻止默认跳转
        event.preventDefault();

        // 每次点击按钮时，读取用户名和密码
        var ajaxArgs = {
            username: $user.val(),
            verification: $('#ver-code').val(),
            password: $passwd.val()
        };
        console.log(ajaxArgs);
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/SCIEManagement/admin/login",
            data: ajaxArgs,
            success: function(data){
                if(typeof data === 'string') {
                    data = JSON.parse(data);
                    console.log(data);
                }
                    console.log(data);
                
                // 登录成功
                if(data.status == 200) {
                    console.log(data);
                    // // 保存用户名
                    // storage.username = info.username;

                    // // 保存到sessionStorage中
                    // session.setLoginState(storage);

    
                    // $.ajax({
                    //     type: "POST",
                    //     url: "login.php",
                    //     data: info,
                    //     success: function(data){
                    //         flag = data;
                    //         alert("登录成功！");
                    //         if (flag==1) {
                    //             window.location.href = 'user-index.html';

                    //         }
                    //         else {
                    //             window.location.href = 'setting.html';

                    //         }
                    //     }
                    // })
                    // // 自动跳转向“首页”页面
                    
                // } else {
                //     alert('提示：用户名或密码有误，请重新登录！');
                }
            }
        })
        
    });
});