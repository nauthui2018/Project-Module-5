var products = {} || products;
var product_types = {} || product_types;
var list_product_type = [];
var warehouses = {} || warehouses;
var list_warehouse = [];

$(document).ready(function () {
    products.init();
});

products.init = function () {
    products.intTable();
    products.initValidation();
    product_types.listProductType();
    warehouses.listWarehouse();
}

products.addNew = function () {
    $('.modal-title').html("Thêm sản phẩm mới");
    products.resetForm();
    $('#modalAddEdit').modal('show');
}

products.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#name').val('');
    $('#brand').val('');
    $('#image').val('');
    $('#unit').val('');
    $('#barcode').val('');
    $('#description').val('');
    $("#formAddEdit").validate().resetForm();
}

products.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 150,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập tên",
                minlength: "Tên sản phẩm quá ngắn",
                maxlength: "Tên quá dài. Bạn vui lòng kiểm tra lại!",
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

products.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/product/',
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
            { data: "image", name: "image", title: "Hình ảnh", orderable: false},
            { data: "name", name: "name", title: "Tên sản phẩm", orderable: true},
            { data: "brand", name: "brand", title: "Nhãn hiệu", orderable: true},
            { data: "description", name: "description", title: "Mô tả", orderable: false},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='products.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='products.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

products.get = function (id) {
    var ajaxGet = $.ajax({
        url: "http://localhost:8080/api/product/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#brand').val(data.brand);
        $('#image').val(data.image);
        $('#unit').val(data.unit);
        $('#barcode').val(data.barcode);
        $('#description').val(data.description);
        $('#product_type').val(0);
        $('#warehouse').val(0);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

product_types.listProductType = function () {
    $.ajax({
        url: "http://localhost:8080/api/product_type",
        method: "GET",
        dataType: "json",
        success: function (data) {
            list_product_type = data;
            $.each(data, function (i, v) {
                $('#product_type').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

product_types.findById = function (id) {
    for (let i = 0; i < list_product_type.length; i++) {
        if (id === list_product_type[i].id) {
            return list_product_type[i];
        }
    }
    return null;
}

warehouses.listWarehouse = function () {
    $.ajax({
        url: "http://localhost:8080/api/warehouse",
        method: "GET",
        dataType: "json",
        success: function (data) {
            list_warehouse = data;
            $.each(data, function (i, v) {
                $('#warehouse').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

warehouses.findById = function (id) {
    for (let i = 0; i < list_warehouse.length; i++) {
        if (id === list_warehouse[i].id) {
            return list_warehouse[i];
        }
    }
    return null;
}

products.save = function () {
    if ($("#formAddEdit").valid()) {
        var product = {};
        product.id = $('#id').val();
        product.name = $('#name').val();
        product.brand = $('#brand').val();
        product.image = $('#image').val();
        product.unit = $('#unit').val();
        product.barcode = $('#barcode').val();
        product.description = $('#description').val();
        product.product_type = product_types.findById(parseInt($('#product_type').val()));
        product.product_type.creating_date = null;
        product.warehouse = warehouses.findById(parseInt($('#warehouse').val()));
        product.warehouse.creating_date = null;
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/product",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product)
            });
            ajaxAdd.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm sản phẩm thành công', 'INFORMATION:');
            });
            ajaxAdd.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('LỖI! Thêm không thành công', 'INFORMATION:');
            });
        } else {
            var ajaxUpdate = $.ajax({
                url: "http://localhost:8080/api/product/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product)
            });
            ajaxUpdate.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Cập nhật thông tin thành công', 'INFORMATION:')
            });
            ajaxUpdate.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('LỖI!. Cập nhật không thành công', 'INFORMATION:')

            });
        }
        return false;
    }
}

products.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa sản phẩm này không?",
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
                    url: "http://localhost:8080/api/product/" + id,
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

