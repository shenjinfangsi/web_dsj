$(function() {
    //点击注册账号
    $("#link_reg").on('click', function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    ////点击登录账号
    $("#link_login").on('click', function() {
        $(".reg-box").hide();
        $(".login-box").show();
    });
    //var url = 'http://www.liulongbin.top:3007';
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwb: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        pwbs: function(value) {
            var pwb = $(".reg-box [name=password]").val();
            if (value !== pwb) {
                return '两次密码不一致';
            }
        }
    });
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        //http://www.liulongbin.top:3007
        //http://ajax.frontent.itheima.net/api/reguser
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                //return console.log(res.message);
                return layer.msg(res.message);
            }
            //console.log('注册成功!');
            layer.msg('注册成功，请登录！');
            $("#link_login").click();
        });
    });
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                console.log(res.token);
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        })
    })
})