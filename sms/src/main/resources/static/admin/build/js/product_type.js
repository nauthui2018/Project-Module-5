var product_types = {} || product_types;

product_types.drawTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [5, 10, 20, 50],
        ajax: {
            url: 'http://localhost:8080/api/product_type/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: null, name: "Checkbox", title: "<input type=\"checkbox\" id=\"check-all\" class=\"flat\">",
                "render":function () {
                    return '<input type="checkbox" class="flat" name="table_records">';
                }
            },
            { data: "id", name: "ID", title: "ID", orderable: false},
            { data: "name", name: "Dòng sản phẩm", title: "Dòng sản phẩm", orderable: true},
            { data: "wholesale_quantity", name: "Số lượng bán sỉ", title: "Số lượng bán sỉ", orderable: true},
            { data: "creating_date", name: "Ngày tạo", title: "Ngày tạo", orderable: true},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='product_types.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a href='javascript:' title='Xóa' onclick='product_types.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
};

product_types.addNew = function () {
    $('#modalTitle').html("Thêm dòng sản phẩm mới");
    product_types.resetForm();
    $('#modalAddEdit').modal('show');
}

product_types.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $("#formAddEdit").validate().resetForm();
}


product_types.get = function (id) {
    console.log('get :' + id);
    $.ajax({
        url: "http://localhost:8080/api/product_type/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#modalTitle').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#modalAddEdit').modal('show');
    }).fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

product_types.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var new_product_type = {};
            new_product_type.name = $('#name').val();

            $.ajax({
                url: "http://localhost:8080/api/provinces/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(new_product_type)
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
            var product_type = {};
            product_type.name = $('#name').val();
            product_type.id = $('#id').val();
            $.ajax({
                url: "http://localhost:8080/api/provinces/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product_type)
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
product_types.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa dòng sản phẩm này không?",
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
                    url: "http://localhost:8080/api/product_type/" + id,
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


product_types.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                maxlength: 150
            }
        },
        messages: {
            name: {
                required: "Vui lòng nhập Tên",
                maxlength: 150
            }
        }
    });
}

product_types.init = function () {
    product_types.intTable();
    product_types.initValidation();
}

$(document).ready(function () {
    product_types.init();
});
