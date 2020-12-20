var suppliers = {} || suppliers;

$(document).ready(function () {
    suppliers.init();
});

suppliers.init = function () {
    suppliers.intTable();
    suppliers.initValidation();
}

suppliers.addNew = function () {
    $('.modal-title').html("Thêm nhà cung cấp mới");
    suppliers.resetForm();
    $('#modalAddEdit').modal('show');
}

suppliers.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#supplier_name').val('');
    $('#supplier_phone').val('');
    $('#supplier_email').val('');
    $('#supplier_address').val('');
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
        "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/supplier/',
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
            { data: "id", name: "ID", title: "ID", orderable: false},
            { data: "supplier_name", name: "supplier_name", title: "Nhà cung cấp", orderable: true},
            { data: "supplier_phone", name: "supplier_phone", title: "Số điện thoại", orderable: false},
            { data: "supplier_address", name: "supplier_address", title: "Địa chỉ", orderable: true},
            { data: "supplier_email", name: "supplier_email", title: "Email", orderable: false},
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
        url: "http://localhost:8080/api/supplier/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#supplier_name').val(data.supplier_name);
        $('#supplier_phone').val(data.supplier_phone);
        $('#supplier_email').val(data.supplier_email);
        $('#supplier_address').val(data.supplier_address);
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
        supplier.supplier_name = $('#supplier_name').val();
        supplier.supplier_phone = $('#supplier_phone').val();
        supplier.supplier_email = $('#supplier_email').val();
        supplier.supplier_address = $('#supplier_address').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/supplier",
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
                url: "http://localhost:8080/api/supplier/",
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
                    url: "http://localhost:8080/api/supplier/" + id,
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

