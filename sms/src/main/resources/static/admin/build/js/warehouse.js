var warehouses = {} || warehouses;
var products = {} || products;
var productList = [];
var stock_checks = {} || stock_checks;
var stock_check_report = [];

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
    $('#product_quantity').val('');
    $('#coming_quantity').val('');
    $('#delivered_quantity').val('');
    $('#scrap_quantity').val('');
    $('#deleted').val('');
    $("#formAddEdit").validate().resetForm();
}

warehouses.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                maxlength: 150,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập tên kho",
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

warehouses.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
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
            { data: "product.id", name: "product_id", title: "ID Sản phẩm", orderable: false},
            { data: "product.name", name : "product_name" , title: "Tên sản phẩm", sortable: false},
            { data: "product_quantity", name: "product_quantity", title: "Số lượng tồn kho", orderable: true},
            { data: "coming_quantity", name: "coming_quantity", title: "Hàng đang về", orderable: true},
            { data: "delivered_quantity", name: "delivered_quantity", title: "Hàng đang giao", orderable: true},
            { data: "scrap_quantity", name: "scrap_quantity", title: "Hàng lỗi", orderable: true},
            { data: "stock_check.checking_date", name: "checking_date", title: "Ngày kiểm kho gần nhất", orderable: true},
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
        $('#product').val(data.product.id);
        $('#product_quantity').val(data.product_quantity);
        $('#coming_quantity').val(data.coming_quantity);
        $('#delivered_quantity').val(data.delivered_quantity);
        $('#scrap_quantity').val(data.scrap_quantity);
        $('#stock_check').val(data.stock_check);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

products.listProducts = function () {
    $.ajax({
        url: "http://localhost:8080/api/product",
        method: "GET",
        dataType: "json",
        success: function (data) {
            productList = data;
            $.each(data, function (i, v) {
                $('#product').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
            warehouses.reset();
        }
    });
}

products.findById = function (id) {
    for (let i = 0; i < productList.length; i++) {
        if (id === productList[i].id) {
            return productList[i];
        }
    }
    return null;
}

warehouses.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() === '') {
            var new_warehouses = {};
            new_warehouses.product_quantity = $('#product_quantity').val();
            new_warehouses.stock_check = new Date().toLocaleString();
            new_warehouses.product = products.findById(parseInt($('#product').val()));
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/warehouse",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(warehouses)
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
            var warehouse = {};
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
        message: "Bạn có muốn xóa nhóm khách hàng này không?",
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

