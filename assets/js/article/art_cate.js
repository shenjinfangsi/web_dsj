$(function() {
    initArtCateList();
    var indexAdd = null;
    var indexEdit = null;
    var layer = layui.layer;

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                //console.log(res);
                //var htmlstr = template('tpl-table', res);
                var htmlstr = template('tpl-table', res);
                //console.log(htmlstr);
                $("tbody").html(htmlstr);
            }
        })
    }
    $("#btnAddCate").on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['520px', '260px'],
            title: '添加文章分类',
            content: $("#dailog-add").html()
        });
    })
    $("body").on('submit', '#form-add', function(e) {
        e.preventDefault();
        //console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章失败');
                }
                initArtCateList();
                layer.close(indexAdd);
            }
        })
    })
    $("tbody").on('click', '.btn-edit', function() {
        //console.log('ok');
        indexEdit = layer.open({
            type: 1,
            area: ['520px', '260px'],
            title: '修改文章分类',
            content: $("#dailog-edit").html()
        });
        var id = $(this).attr('data-id');
        //console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                //console.log(res);
                layui.form.val('form-edit', res.data);
            }
        })
    })
    $("body").on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('文章更新失败！');
                }
                layer.close(indexEdit);
                layer.msg('文章更新成功！');
                initArtCateList();
            }
        })
    })
    $("tbody").on('click', '.btn-delete', function() {
        var id = $(this).attr('data-Id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败');
                    }
                    layer.msg('删除文章成功');
                }
            })
            layer.close(index);
            initArtCateList();
        });
    })
})