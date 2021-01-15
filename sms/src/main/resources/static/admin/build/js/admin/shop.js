var shops = {} || shops;

shops.intTable = function () {
    $("#datatables").DataTable({
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        "language": {
            "emptyTable": "Không có Cửa hàng nào!",
            "lengthMenu": "Hiển thị _MENU_ cửa hàng",
            "search": "Tìm kiếm",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ cửa hàng",
            "paginate": {
                "next": "Trang tiếp",
                "previous": "Trang trước",
            },
        },
        ajax: {
            url: '/api/admin/shop/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "shop_name", name: "Tên", title: "Tên", orderable: true
            },
            {
                data: "phone", name: "Số điện thoại", title: "Số điện thoại", orderable: false
            },
            {
                data: "address", name: "Địa chỉ", title: "Địa chỉ", orderable: false
            },
            {
                data: "email", name: "Email", title: "Email", orderable: false
            },
            {
                data: "created_at", name: "Ngày đăng ký", title: "Ngày đăng ký", orderable: true
            },
            {
                data: "updated_at", name: "Cập nhật lần cuối", title: "Cập nhật lần cuối", orderable: true
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = `
                        <a href='javascript:' title='Xóa' onclick='shops.delete(${data})' style='color: red'><i class="fas fa-trash-alt"></i></a>
                        <a href='/admins/shops/shop_detail/${data}' title='Xem chi tiết' style='color: blue'><i class="fas fa-eye"></i></a>`
                    return str;
                }
            }
        ]
    });
};

shops.addNew = function () {
    $('#modalTitle').html("Thêm Cửa hàng mới");
    shops.resetForm();
    $('#modalAddEdit').modal('show');
    $('#email').prop("disabled", false);
}

shops.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#shop_name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#address').val('');
    $('#province').val('');
    $('#lineOfBusiness').val('');
    $("#formAddEdit").validate().resetForm();
}


shops.get = function (id) {
    console.log('get :' + id);
    $.ajax({
        url: "/api/admin/shop/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html("Chỉnh sửa thông tin");
            $('#id').val(data.id);
            $('#shop_name').val(data.shop_name);
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            if (data.email != null) {
                $('#email').prop("disabled", true);
            } else $('#email').prop("disabled", false);
            $('#address').val(data.address);
            $('#province').val(data.province.id);
            $('#lineOfBusiness').val(data.lineOfBusiness.id);
            $('#modalAddEdit').modal('show');
        }
    ).fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

shops.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var shopObj = {};
            shopObj.shop_name = $('#shop_name').val();
            shopObj.phone = $('#phone').val();
            shopObj.email = $('#email').val();
            shopObj.address = $('#address').val();
            var province = {};
            province.id = $('#province').val();
            shopObj.province = province;
            var lob = {};
            lob.id = $('#lineOfBusiness').val();
            shopObj.lineOfBusiness = lob;
            var addShop = $.ajax({
                url: "/api/admin/shop",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(shopObj)
            });
            addShop.done(function (data) {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm Cửa hàng thành công', 'INFORMATION:')
                setTimeout(() => {
                    shops.addUser(data.id)
                }, 500);
            });
            addShop.fail(function (xhr) {
                if (xhr.status == 404) {
                    toastr.error('Email này đã được sử dụng', 'INFORMATION:')
                }
            });
        }
        return false;
    }
}

shops.addUser = function (idShop) {
    var province = {};
    province.id = $('#province').val();
    var user = {};
    user.email = $('#email').val();
    user.role = 'SHOP_OWNER';
    user.province = province;
    var shop = {}
    shop.id = idShop;
    user.shop = shop;
    var addUser = $.ajax({
        url: "/api/admin/user/",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(user)
    });
    addUser.done(function () {
        $("#datatables").DataTable().ajax.reload();
        toastr.info('Thêm Tài khoản thành công', 'INFORMATION:')
    });
    addUser.fail(function (xhr) {
        if (xhr.status = 404) {
            toastr.error('Email này đã được sử dụng', 'INFORMATION:')
        }
    });
}

shops.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa Cửa hàng này không?",
        buttons: {
            confirm: {
                label: 'Có',
                className: 'btn-success'
            },
            cancel: {
                label: 'Không',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/api/admin/shop/" + id,
                    method: "DELETE",
                    dataType: "json"
                }).done(function () {
                    console.log("DELETE SUCCESS");
                    $("#datatables").DataTable().ajax.reload();
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                }).fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

shops.remove = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa Cửa hàng này không?",
        buttons: {
            confirm: {
                label: 'Có',
                className: 'btn-success'
            },
            cancel: {
                label: 'Không',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/admins/shops/delete/" + id,
                    method: "DELETE",
                    dataType: "json"
                }).done(function () {
                    console.log("DELETE SUCCESS");
                    setTimeout(function () {
                        location.href = "/admins/shops"
                    }, 1000);
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                }).fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

shops.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            shop_name: {
                required: true,
                maxlength: 20
            },
            phone: {
                required: true,
                maxlength: 17,
                minlength: 10
            },
            email: {
                required: true,
                maxlength: 60
            },
            address: {
                required: true,
                maxlength: 60,
                minlength: 5
            },
            province: {
                required: true,
            },
            lineOfBusiness: {
                required: true,
            },
        },
        messages: {
            shop_name: {
                required: "Vui lòng nhập tên Cửa hàng",
                maxlength: "Không quá 20 ký tự"
            },
            phone: {
                required: "Vui lòng nhập Số điện thoại",
                maxlength: "Nhập từ 10 đến 17 ký tự",
                minlength: "Nhập từ 10 đến 17 ký tự"
            },
            email: {
                required: "Vui lòng nhập Email",
                maxlength: "Không quá 60 ký tự"
            },
            address: {
                required: "Vui lòng nhập Địa chỉ",
                maxlength: "Nhập từ 5 đến 60 ký tự",
                minlength: "Nhập từ 5 đến 60 ký tự"
            },
            province: {
                required: "Vui lòng chọn tỉnh thành",
            },
            lineOfBusiness: {
                required: "Vui lòng chọn mặt hàng kinh doanh",
            },
        }
    });
}

shops.initProvince = function () {
    $.ajax({
        url: "/api/admin/province/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#province').empty();
            $('#province').append(`<option value="">Chọn tỉnh thành</option>`);
            $.each(data, function (i, v) {
                $('#province').append(
                    "<option value='" + v.id + "'>" + v.name + "</option>"
                );
            });
        }
    });
};

shops.initUser = function () {
    $.ajax({
        url: "/api/admin/user/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#user').empty();
            $('#user').append(`<option value="">Chọn Tài khoản</option>`);
            $.each(data, function (i, v) {
                $('#user').append(
                    "<option value='" + v.id + "'>" + v.user_fullname + "</option>"
                );
            });
        }
    });
};

shops.initLineOfBusiness = function () {
    $.ajax({
        url: "/api/admin/lob/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#lineOfBusiness').empty();
            $('#lineOfBusiness').append(`<option value="">Chọn mặt hàng kinh doanh</option>`);
            $.each(data, function (i, v) {
                $('#lineOfBusiness').append(
                    "<option value='" + v.id + "'>" + v.name + "</option>"
                );
            });
        }
    });
};

shops.init = function () {
    shops.intTable();
    shops.initValidation();
    shops.initProvince();
    shops.initLineOfBusiness();
    shops.initUser();
}

$(document).ready(function () {
    shops.init();
});
