var warehouses = {} || warehouses;

$(document).ready(function () {
    warehouses.init();
});

warehouses.init = function () {
    warehouses.intTable();
    warehouses.initValidation();
}

warehouses.addNew = function () {
    $('.modal-title').html("Tạo kho mới");
    warehouses.resetForm();
    $('#modalAddEdit').modal('show');
}

warehouses.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#name').val('');
    $('#description').val('');
    $('#deleted').val('');
    $("#formAddEdit").validate().resetForm();
}

warehouses.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                minlength: 5,
                maxlength: 150,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập tên kho",
                minlength: "Tên kho quá ngắn!",
                maxlength: "Tên kho quá dài. Bạn vui lòng kiểm tra lại!",
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

warehouses.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, -1], [5, 10, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/warehouse/',
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
            { data: "id", name: "id", title: "ID Kho", orderable: false},
            { data: "name", name : "name" , title: "Tên kho", sortable: true},
            { data: "description", name: "description", title: "Mô tả", orderable: true},
            { data: "creating_date", name: "creating_date", title: "Ngày tạo", orderable: false},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='warehouses.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='warehouses.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

warehouses.get = function (id) {
    var ajaxGet = $.ajax({
        url: "http://localhost:8080/api/warehouse/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

warehouses.save = function () {
    if ($("#formAddEdit").valid()) {
        var warehouse = {};
        warehouse.name = $('#name').val();
        warehouse.description = $('#description').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/warehouse",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(warehouse)
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
            warehouse.id = $('#id').val();
            var ajaxUpdate = $.ajax({
                url: "http://localhost:8080/api/warehouse/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(warehouse)
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

warehouses.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa kho này không?",
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
                    url: "http://localhost:8080/api/warehouse/" + id,
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

