var product_types = {} || product_types;
var listProductType = [];

product_types.init = function () {
    product_types.intTable();
    product_types.initValidation();
}

product_types.addNew = function () {
    $('.modal-title').html("Thêm dòng sản phẩm mới");
    product_types.resetForm();
    $('#modalAddEdit').modal('show');
}

product_types.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $('#wholesale_quantity').val('');
    $('#id').val('');
    $('#deleted').val('');
    $("#formAddEdit").validate().resetForm();
}

product_types.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                maxlength: 150,
            },
            wholesale_quantity: {
                required: true,
                regex: "[0-9]",
                minlength: 2,
                maxlength: 6,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập tên",
                maxlength: "Tên quá dài. Bạn vui lòng kiểm tra lại!",
            },
            wholesale_quantity: {
                required: "Vui lòng số lượng bán sỉ cho dòng hàng này!",
                regex: "Số lượng bạn nhập không đúng. Vui lòng kiểm tra lại",
                minlength: "Số lượng bán sỉ tối thiểu là 10",
                maxlength: "Số lượng bán sỉ tối đa là 99999"
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

product_types.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        ajax: {
            url: "/api/user/product_type/",
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id", name: "ID", title: "ID", orderable: false},
            { data: "name", name: "Dòng sản phẩm", title: "Dòng sản phẩm", orderable: true},
            { data: "wholesale_quantity", name: "Số lượng bán sỉ", title: "Số lượng bán sỉ", orderable: true},
            { data: "creating_date", name: "Ngày tạo", title: "Ngày tạo", orderable: true},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='product_types.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='product_types.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

product_types.get = function (id) {
    var ajaxGet = $.ajax({
        url: "/api/user/product_type/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#wholesale_quantity').val(data.wholesale_quantity);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

product_types.save = function () {
    if ($("#formAddEdit").valid()) {
        var product_type = {};
        product_type.id = $('#id').val();
        product_type.name = $('#name').val();
        product_type.wholesale_quantity = $('#wholesale_quantity').val();
        product_type.deleted = $('#deleted').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "/api/user/product_type",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product_type)
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
            var ajaxUpdate = $.ajax({
                url: "/api/user/product_type/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product_type)
            });
            ajaxUpdate.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Cập nhật thành công', 'INFORMATION:')
            });
            ajaxUpdate.fail(function () {
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
                var ajaxDelete = $.ajax({
                    url: "/api/user/product_type/" + id,
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

product_types.listProductType = function () {
    $.ajax({
        url: "/api/user/product_type",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listProductType = data;
            $.each(data, function (i, v) {
                $('#product_type').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

product_types.findById = function (id) {
    for (let i = 0; i < listProductType.length; i++) {
        if (id === listProductType[i].id) {
            return listProductType[i];
        }
    }
    return null;
}

