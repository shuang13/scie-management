require ('!style-loader!css-loader!sass-loader!../../public-resource/css/components-dir/base.scss');
var session = require('./session.js');
var user = {}; //全局对象
user.session = session;
user.session.setLoginState('admin');
var my_username = user.session.getLoginState();

user.SERVER_URL = 'http://127.0.0.1:80/SCIEManagement';
// 加载图标
user.loading = function (element) {
    var loadingHtml = '<div id="loading"></div>';
    element.html(loadingHtml);
}

$(function () {
    $('#current_username').html(my_username);
    $('.dropdown-toggle').on('mouseenter', function () {
        $('.user-nav').slideDown("100");
    });
    $('.top-nav-right').on('mouseleave', function () {
        if ($('.user-nav').show()) {
            $('.user-nav').hide();
        }
    });
});
module.exports = user;
