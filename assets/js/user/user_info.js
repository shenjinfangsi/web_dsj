$(function() {
    var form = layui.form;
    form.verify = ({
        nickname: function(value) {
            if (value.length > 6) {
                return '字符必须在1~6之间';
            }
        }
    });
    initUserInfo();
    $("#btnReast").on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        //console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新信息失败');
                }
                layui.layer.msg('更新信息成功');
                window.parent.getUserInfo();
            }
        })
    })
})


function initUserInfo() {
    var form = layui.form;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //console.log(res);
            form.val('formUserInfo', res.data);
            //console.log($("#layui-form").serialize());
        }
    })
}