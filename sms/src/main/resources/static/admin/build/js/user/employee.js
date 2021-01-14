var employees = {} || employees;
const idShop = $('#idShop').val();
const idUser = $('#idUser').val();
const roleUser = $('#roleUser').val();
employees.intTable = function () {
    $("#datatables").DataTable({
        "language": {
            "emptyTable": "Không có nhân viên nào!",
            "lengthMenu": "Hiển thị _MENU_ nhân viên",
            "search": "Tìm kiếm",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ nhân viên",
            "paginate": {
                "next": "Trang tiếp",
                "previous": "Trang trước",
            },
        },
        ajax: {
            url: '/api/admin/user/listUser/' + $('#idShop').val(),
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "Mã nhân viên", orderable: false,
            },
            {
                data: "user_fullname",
                name: "name",
                title: "Tên nhân viên",
                orderable: true,
                "render": function (data) {
                    if (data == null) {
                        return 'Không có'
                    } else {
                        return `${data}`
                    }
                }
            },
            {
                data: "user_phone", name: "phone", title: "Số điện thoại", orderable: false, "render": function (data) {
                    if (data == null) {
                        return 'Không có'
                    } else {
                        return `${data}`
                    }
                }
            },
            {
                data: "email", name: "email", title: "Email", orderable: false,
            },
            {
                data: "user_address",
                name: "user_address",
                title: "Địa chỉ",
                orderable: false,
                "render": function (data) {
                    if (data == null) {
                        return 'Không có'
                    } else {
                        return `${data}`
                    }
                }
            },
            {
                data: "starting_date", name: "starting_date", title: "Ngày đăng ký", orderable: false,
            },
            {
                data: "role", name: "Role", title: "Chức vụ", orderable: false, "render": function (data) {
                    if (data == "EMPLOYEE") {
                        return "Nhân viên";
                    } else if (data == "SHOP_OWNER") {
                        return "Chủ cửa hàng";
                    }
                }
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    if (roleUser != "SHOP_OWNER") {
                        if(idUser==data){
                            return `<a href="javascript:" title="Sửa" onclick="employees.get(${data})" style='color: orange'><i class=\"fas fa-edit\"></i></a>
                                    <a href='/user/employees/employeeDetail/${data}' title='Xem chi tiết' style='color: blue'><i class="fas fa-eye"></i></a>`
                        }
                        return `<a href='/user/employees/employeeDetail/${data}' title='Xem chi tiết' style='color: blue'><i class="fas fa-eye"></i></a>`
                    } else if (idUser != data) {
                        return `<a href="javascript:" title="Sửa" onclick="employees.get(${data})" style='color: orange'><i class=\"fas fa-edit\"></i></a>
                        <a href='javascript:' title='Xóa User' onclick=employees.delete(${data}) style='color: red'><i class="fas fa-trash-alt"></i></a>
                        <a href='/user/employees/employeeDetail/${data}' title='Xem chi tiết' style='color: blue'><i class="fas fa-eye"></i></a>`;
                    } else {
                        return `<a href="javascript:" title="Sửa" onclick="employees.get(${data})" style='color: orange'><i class=\"fas fa-edit\"></i></a>
                        <a href='/user/employees/employeeDetail/${data}' title='Xem chi tiết' style='color: blue'><i class="fas fa-eye"></i></a>`;
                    }
                }
            }
        ]
    });
}

employees.addNew = function () {
    $('#modalTitle').html("Thêm Tài khoản mới");
    employees.resetForm();
    $('#modalAddEdit').modal('show');
}

employees.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#user_fullname').val('');
    $('#user_phone').val('');
    $('#user_gender').val('');
    $('#personal_code').val('');
    $('#user_address').val('');
    $('#province').val('');
    $('#email').val('').prop('disabled',false);
    $('#role').prop('disabled',false);
    $("#formAddEdit").validate().resetForm();
}

employees.get = function (id) {
    $.ajax({
        url: "/api/admin/user/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#modalTitle').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#user_fullname').val(data.user_fullname);
        $('#user_phone').val(data.user_phone);
        $('#user_gender').val(data.user_gender);
        $('#personal_code').val(data.personal_code);
        $('#user_address').val(data.user_address);
        if(data.province==null){
            $('#province').val('');
        } else $('#province').val(data.province.id);
        $('#email').val(data.email).prop('disabled',true);
        $('#role').val(data.role);
        if(roleUser=='EMPLOYEE'){$('#role').prop('disabled',true);}
        else {$('#role').prop('disabled',false);}
        $('#modalAddEdit').modal('show');
    }).fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

employees.save = function () {
    if ($("#formAddEdit").valid()) {
        var userObj = {};
        userObj.user_fullname = $('#user_fullname').val();
        userObj.user_phone = $('#user_phone').val();
        userObj.personal_code = $('#personal_code').val();
        userObj.user_gender = $('#user_gender').val();
        userObj.user_address = $('#user_address').val();
        var province = {};
        province.id = $('#province').val();
        userObj.province = province;
        userObj.email = $('#email').val();
        userObj.role = $('#role').val();
        var shop = {}
        shop.id = $('#idShop').val();
        userObj.shop = shop;
        if ($('#id').val() == 0) {
            $.ajax({
                url: "/api/admin/user/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userObj)
            }).done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm thành công', 'INFORMATION:')
            }).fail(function (xhr) {
                if (xhr.status = 404) {
                    toastr.error('Email này đã được sử dụng', 'INFORMATION:')
                }
            });

        } else {
            userObj.id = $('#id').val();
            $.ajax({
                url: "/api/admin/user/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userObj)
            }).done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Sửa thành công', 'INFORMATION:')
            }).fail(function () {
                toastr.error('Không thành công', 'INFORMATION:')
            });
        }
    }
    return false;
}

employees.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa tài khoản này không?",
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
                    url: "/api/admin/user/" + id,
                    method: "DELETE",
                    dataType: "json"
                }).done(function () {
                    $("#datatables").DataTable().ajax.reload();
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                }).fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

employees.remove = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa tài khoản này không?",
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
                    url: "/user/employees/delete/" + id,
                    method: "DELETE",
                    dataType: "json"
                }).done(function () {
                    setTimeout(function () {
                        location.href = "/user/employees/" + idShop;
                    }, 1000);
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                }).fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

employees.initValidation = function () {
    $('#user_fullname').val('');
    $('#user_phone').val('');
    $('#user_gender').val('');
    $('#personal_code').val('');
    $('#user_address').val('');
    $('#province').val('');
    $('#email').val('').prop('disabled',false);
    $('#role').prop('disabled',false);
    $("#formAddEdit").validate({
        rules: {
            user_fullname: {
                required: true,
                maxlength: 30,
                minlength:5,
            },
            user_phone: {
                required: true,
                maxlength:17,
            },
            email: {
                required: true,
                maxlength: 60
            },
            personal_code: {
                required: true,
                maxlength: 10,
            },
            user_gender: {
                required: true,
            },
            user_address: {
                required: true,
                maxlength:60
            },
            province: {
              required: true,
            },
            role: {
                required: true
            },
        },
        messages: {
            user_fullname: {
                required: 'Vui lòng nhập tên của nhân viên',
                maxlength: 'Tên quá dài. Tối đa 30 ký tự',
                minlength:'Tên quá ngắn. Tối thiểu 5 ký tự',
            },
            user_phone: {
                required: 'Vui lòng nhập số điện thoại nhân viên',
                maxlength:'Số điện thoại quá dài. Tối đa 17 ký tự',
            },
            email: {
                required: 'Vui lòng nhập Email nhân viên',
                maxlength: 'Email quá dài. Tối đa không quá 60 ký tự',
            },
            personal_code: {
                required: 'Vui lòng nhập số Chứng minh nhân dân nhân viên',
                maxlength:'Số chứng minh quá dài. Tối đa không quá 10 số'
            },
            user_gender: {
                required: 'Vui lòng chọn Giới tính nhân viên',
            },
            user_address: {
                required: 'Vui lòng nhập Địa chỉ cụ thể của nhân viên',
                maxlength:'Địa chỉ không quá 60 ký tự'
            },
            province: {
                required: 'Vui lòng chọn Tỉnh thành của nhân viên',
            },
            role: {
                required: 'Vui lòng chọn Chức vụ cho nhân viên'
            },
        }
    });
}

employees.initProvince = function () {
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

employees.init = function () {
    employees.intTable();
    employees.initProvince();
    employees.initValidation();

}

$(document).ready(function () {
    employees.init();
})

