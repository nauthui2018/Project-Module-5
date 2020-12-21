var users = {} || users;

users.intTable = function () {
    $("#datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/user/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: null, name: "Checkbox", title: "<input type=\"checkbox\" id=\"check-all\" class=\"flat\">", orderable: false,
                "render":function () {
                    return '<input type="checkbox" class="flat" name="table_records">';
                }
            },
            {
                data: "user_avatar", name: "Avatar", title: "Avatar", orderable: false, "render": function (data) {
                return  str = `<img src="${data}" alt="avatar" width="30rem"/>`
                }
            },
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "user_fullname", name: "Tên", title: "Tên", orderable: true
            },
            {
                data: "user_phone", name: "Số điện thoại", title: "Số điện thoại", orderable: false
            },
            {
                data: "user_address", name: "Địa chỉ", title: "Địa chỉ", orderable: false
            },
            {
                data: "email", name: "Email", title: "Email", orderable: false
            },
            {
                data: "starting_date", name: "Ngày đăng ký", title: "Ngày đăng ký", orderable: true
            },
            {
                data: "role", name: "Role", title: "Role", orderable: false
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Sửa User' onclick='users.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a href='javascript:' title='Xóa User' onclick='users.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
};

users.addNew = function () {
    $('#modalTitle').html("Thêm User mới");
    users.resetForm();
    $('#modalAddEdit').modal('show');
}

users.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $("#formAddEdit").validate().resetForm();
}


users.get = function (id) {
    console.log('get :' + id);
    $.ajax({
        url: "http://localhost:8080/api/user/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#modalTitle').html("Chỉnh sửa User");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#modalAddEdit').modal('show');
    }).fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

users.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var userObj = {};
            userObj.name = $('#name').val();

            $.ajax({
                url: "http://localhost:8080/api/user/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userObj)
            }).done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm thành công', 'INFORMATION:')
            }).fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Thêm không thành công', 'INFORMATION:')

            });
        } else {
            var userObj = {};
            userObj.name = $('#name').val();
            userObj.id = $('#id').val();
            $.ajax({
                url: "http://localhost:8080/api/user/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userObj)
            }).done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Cập nhật thành công', 'INFORMATION:')
            }).fail(function () {
                console.log("POST ");
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Cập nhật không thành công', 'INFORMATION:')

            });
        }
        return false;
    }
}
users.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa user này không?",
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
                    url: "http://localhost:8080/api/user/" + id,
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


users.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                maxlength: 150
            }
        },
        messages: {
            name: {
                required: "Vui lòng nhập Tiêu đề",
                maxlength: 150
            }
        }
    });
}

users.init = function () {
    users.intTable();
    users.initValidation();
}

$(document).ready(function () {
    users.init();
});
