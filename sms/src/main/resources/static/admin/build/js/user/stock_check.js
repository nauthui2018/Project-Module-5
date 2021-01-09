var stock_checks = {} || stock_checks;
var listStockCheck = [];

stock_checks.init = function () {
    stock_checks.intTable();
    stock_checks.initValidation();
    warehouses.listWarehouse();
}

stock_checks.addNew = function () {
    $('.modal-title').html("Thêm phiếu kiểm kho mới");
    stock_checks.resetForm();
    $('#modalAddEdit').modal('show');
}

stock_checks.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#finished').val('');
    $('#deleted').val('');
    $("#formAddEdit").validate().resetForm();
}

stock_checks.initValidation = function () {
    $("#formAddEdit").validate({
        // rules: {
        //     customer_fullName: {
        //         required: true,
        //         maxlength: 150,
        //     },
        // },
        // messages: {
        //     name: {
        //         required: "Bạn chưa nhập nhóm khách hàng",
        //         maxlength: "Tên nhóm quá dài. Bạn vui lòng kiểm tra lại!",
        //     },
        // },
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

stock_checks.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        ajax: {
            url: "/api/user/stock_check/",
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id", name: "ID", title: "ID", sortable: false},
            { data: "warehouse.name", name: "warehouse", title: "Tên kho hàng", sortable: true},
            { data: "creating_date", name: "creating_date", title: "Ngày tạo phiếu kiểm", sortable: true},
            { data: "finished", name: "finished", title: "Trạng thái", sortable: false,
                "render": function (data) {
                    return data ? "Đã hoàn thành" : "Chưa hoàn thành";
                }
            },
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='stock_checks.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: #ffa500'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='stock_checks.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

stock_checks.get = function (id) {
    var ajaxGet = $.ajax({
        url: "/api/user/stock_check/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#id').val(data.id);
        $('#finished').val(data.finished);
        $('#deleted').val(data.deleted);
        $('#warehouse').val(data.warehouse.id);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

stock_checks.save = function () {
    if ($("#formAddEdit").valid()) {
        var stock_check = {};
        stock_check.id = $('#id').val();
        stock_check.warehouse = warehouses.findById(parseInt($('#warehouse').val()));
        stock_check.warehouse.creating_date = null;
        stock_check.finished = $('#finished').val();
        stock_check.deleted = $('#deleted').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "/api/user/stock_check",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(stock_check)
            });
            ajaxAdd.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Tạo thành công', 'INFORMATION:');
            });
            ajaxAdd.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Tạo không thành công', 'INFORMATION:');
            });
        } else {
            var ajaxUpdate = $.ajax({
                url: "/api/user/stock_check/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(stock_check)
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

stock_checks.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa phiếu kiểm kho này không?",
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
                    url: "/api/user/stock_check/" + id,
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

stock_checks.listStockCheck = function () {
    $.ajax({
        url: "/api/user/stock_check",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listStockCheck = data;
            $.each(data, function (i, v) {
                $('#stock_check').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

stock_checks.findById = function (id) {
    for (let i = 0; i < listStockCheck.length; i++) {
        if (id === listStockCheck[i].id) {
            return listStockCheck[i];
        }
    }
    return null;
}

