var stock_checks = {} || stock_checks;
var warehouses = {} || warehouses;
var listWarehouse = [];

$(document).ready(function () {
    stock_checks.init();
});

stock_checks.init = function () {
    stock_checks.intTable();
    stock_checks.initValidation();
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
    $('#checking_date').val('');
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
        "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/stock_check/',
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
            { data: "id", name: "ID", title: "ID", sortable: false},
            { data: "warehouse.name", name: "warehouse", title: "Tên kho hàng", sortable: true},
            { data: "checking_date", name: "checking_date", title: "Ngày thực hiện", sortable: true},
            { data: "finished", name: "finished", title: "Trạng thái", sortable: false},
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
        url: "http://localhost:8080/api/stock_check/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#id').val(data.id);
        $('#finished').val(data.finished);
        $('#checking_date').val(data.checking_date);
        $('#deleted').val(data.deleted);
        $('#warehouse').val(data.warehouse.id);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

warehouses.listWarehouse = function () {
    $.ajax({
        url: "http://localhost:8080/api/warehouse",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listWarehouse = data;
            $.each(data, function (i, v) {
                $('#warehouse').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

warehouses.findById = function (id) {
    for (let i = 0; i < listWarehouse.length; i++) {
        if (id === listWarehouse[i].id) {
            return listWarehouse[i];
        }
    }
    return null;
}

stock_checks.save = function () {
    if ($("#formAddEdit").valid()) {
        var stock_check = {};
        stock_check.warehouse = warehouses.findById(parseInt($('#warehouse').val()));
        stock_check.checking_date = $('#checking_date').val();
        stock_check.finished = $('#finished').val();
        stock_check.deleted = $('#deleted').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/stock_check",
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
            stock_check.id = $('#id').val();
            var ajaxUpdate = $.ajax({
                url: "http://localhost:8080/api/stock_check/",
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
                console.log("POST ");
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
                    url: "http://localhost:8080/api/stock_check/" + id,
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

