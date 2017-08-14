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


(document).ready(function () {
    var $form = $('form');
    var $user = $form.find('#username');
    var $passwd = $form.find('#password');
    var $submit = $form.find('.login-submit');

    $submit.on('click', function (event) {
        // 阻止默认跳转
        event.preventDefault();

        // 每次点击按钮时，读取用户名和密码
        var info = {
            username: $user.val(),
            password: $passwd.val()
        };

        // 检测用户名是否为空
        if(info.username == '') {
            alert('提示：请输入用户名！');
            return ;
        }

        // 检测密码是否为空
        if(info.password == '') {
            alert('提示：请输入密码！');
            return ;
        }

        $.post('##',
            'stuNum=' + info.username +
            '&idNum=' + info.password,
            function (res) {
                var data;
                var storage = {};

                if(typeof res === 'string') {
                    data = JSON.parse(res);
                } else {
                    data = res;
                }
                // 登录成功
                if(data.status == 200) {
                    // 保存用户名
                    storage.username = info.username;

                    // 保存到sessionStorage中
                    session.setLoginState(storage);

    
                    $.ajax({
                        type: "POST",
                        url: "login.php",
                        data: info,
                        success: function(data){
                            flag = data;
                            alert("登录成功！");
                            if (flag==1) {
                                window.location.href = 'user-index.html';

                            }
                            else {
                                window.location.href = 'setting.html';

                            }
                        }
                    })
                    // 自动跳转向“首页”页面
                    
                } else {
                    alert('提示：用户名或密码有误，请重新登录！');
                }
            }
        );
    });
});