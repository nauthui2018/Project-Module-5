var suppliers = {} || suppliers;
var listSupplier = [];

suppliers.init = function () {
    suppliers.intTable();
    suppliers.initValidation();
}

suppliers.addNew = function () {
    $('.modal-title').html("Thêm nhà cung cấp mới");
    suppliers.resetForm();
    $('#modalAddEdit').modal('show');
}

suppliers.listSupplier = function () {
    $.ajax({
        url: "/api/user/supplier",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listSupplier = data;
            $.each(data, function (i, v) {
                $('#supplier').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

suppliers.findById = function (id) {
    for (let i = 0; i < listSupplier.length; i++) {
        if (id === listSupplier[i].id) {
            return listSupplier[i];
        }
    }
    return null;
}

suppliers.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#address').val('');
    $('#deleted').val('');
    $("#formAddEdit").validate().resetForm();
}

suppliers.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                maxlength: 150,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập tên nhà cung cấp",
                maxlength: "Tên nhà cung cấp quá dài. Bạn vui lòng kiểm tra lại!",
            },
        },
    });
}

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);

suppliers.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        ajax: {
            url: "/api/user/supplier/",
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id", name: "ID", title: "ID", orderable: false},
            { data: "name", name: "name", title: "Nhà cung cấp", orderable: true},
            { data: "phone", name: "phone", title: "Số điện thoại", orderable: false},
            { data: "address", name: "address", title: "Địa chỉ", orderable: true},
            { data: "email", name: "email", title: "Email", orderable: false},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='suppliers.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='suppliers.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

suppliers.get = function (id) {
    var ajaxGet = $.ajax({
        url: "/api/user/supplier/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#phone').val(data.phone);
        $('#email').val(data.email);
        $('#address').val(data.address);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

suppliers.save = function () {
    if ($("#formAddEdit").valid()) {
        var supplier = {};
        supplier.name = $('#name').val();
        supplier.phone = $('#phone').val();
        supplier.email = $('#email').val();
        supplier.address = $('#address').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "/api/user/supplier",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(supplier)
            });
            ajaxAdd.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm thành công', 'INFORMATION:');
            });
            ajaxAdd.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Thêm không thành công', 'INFORMATION:');
            });
        } else {
            supplier.id = $('#id').val();
            var ajaxUpdate = $.ajax({
                url: "/api/user/supplier/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(supplier)
            });
            ajaxUpdate.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Cập nhật thành công', 'INFORMATION:')
            });
            ajaxUpdate.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Cập nhật không thành công', 'INFORMATION:')

            });
        }
        return false;
    }
}

suppliers.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa nhà cung cấp này không?",
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
                var ajaxDelete = $.ajax({
                    url: "/api/user/supplier/" + id,
                    method: "DELETE",
                    dataType: "json"
                });
                ajaxDelete.done(function () {
                    $("#datatables").DataTable().ajax.reload();
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                });
                ajaxDelete.fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

