$(function () {
    $('.dropdown-toggle').on('mouseenter', function () {
        $('.user-nav').slideDown("100");
    });
    $('.top-nav-right').on('mouseleave', function () {
        if ($('.user-nav').show()) {
            $('.user-nav').hide();
        }
    });
});