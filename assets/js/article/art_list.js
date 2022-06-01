$(function() {
    var q = {
        pagenum: 1, //  	页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    }
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    initTable();
    initCase();
    //渲染列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败!');
                }
                layer.msg('获取数据成功!')
                var htmlstr = template('tpl-table', res);
                $("tbody").html(htmlstr);
                renderPage(res.total)
                console.log(res);
            }
        })
    }
    //时间过滤
    template.defaults.imports.fataFormat = function(date) {
        var dt = new Date(date);
        var y = bl(dt.getFullYear());
        var m = bl(dt.getMonth() + 1);
        var d = bl(dt.getDate());
        var hh = bl(dt.setHours());
        var mm = bl(dt.getMinutes());
        var ss = bl(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    function bl(n) {
        return n > 10 ? n : '0' + n;
    }
    //初始化分类
    function initCase() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败');
                }
                layer.msg('获取文章分类成功');
                var htmlstr = template('tpl-cate', res);
                $("[name=cate_id]").html(htmlstr);
                form.render();
            }
        })
    }
    //筛选列表
    $("#form-search").on('submit', function(e) {
            e.preventDefault();
            var cate_id = $("[name=cate_id]").val();
            var state = $("[name=state]").val();
            q.cate_id = cate_id;
            q.state = state;
            initTable();
        })
        //定义渲染分页列表
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox', //分页id名
            count: total, //总条数
            limit: q.pagesize, //每页条数
            curr: q.pagenum, //默认第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                console.log(first);
                if (!first) {
                    initTable();
                }
            }
        })
    }
    $("tbody").on('click', '.btn-delete', function() {
        var len = $(".btn-delete").length;
        console.log(len);
        var id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('删除文章失败！');
                    }
                    layer.msg('删除文章成功！');
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : --q.pagenum;
                    }
                    initTable();
                }
            })
            layer.close(index);
        });
    })
})