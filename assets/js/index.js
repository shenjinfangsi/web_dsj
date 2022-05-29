$(function() {
    getUserInfo();
    //点击退出实现退出功能
    var layer = layui.layer;
    $("#btnLogout").on('click', function() {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = './login.html'

            //关闭弹出层
            layer.close(index);
        });
    });

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('提取信息失败！');
                }
                readerAvatar(res.data);
            }
            // complete: function(res) {
            //    console.log(res);
            // responseJSON:
            //     message: "身份认证失败！"
            // status: 1
            //    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //        localStorage.removeItem('token');
            //        location.href = './login.html';
            //    }
            //}
    });
}

function readerAvatar(data) {
    var name = data.nickname || data.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    if (data.user_pic !== null) {
        $(".layui-nav-img").attr('src', data.user_pic).show();
        $(".text-atavar").hide();
    } else {
        $(".text-atavar").html(name[0].toUpperCase()).show();
        $(".layui-nav-img").hide();
    }
}