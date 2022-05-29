$.ajaxPrefilter(function(options) {
    //统一接收根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //统一请求权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局complete函数
    options.complete = function(res) {
        console.log(res);
        // responseJSON:
        //     message: "身份认证失败！"
        // status: 1
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html';
        }
    }
})