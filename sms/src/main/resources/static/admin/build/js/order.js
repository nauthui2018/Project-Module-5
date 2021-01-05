var orders = {} || orders;

orders.init = function () {
    orders.intTable();
    orders.initValidation();
}

orders.addNew = function () {
    $('.modal-title').html("Tạo đơn hàng mới");
    orders.resetForm();
    $('#modalAddEdit').modal('show');
}

orders.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#finished').val('');
    $('#discount').val('');
    $('#supplier').val(0);
    $('#total_amount').val('');
    $("#formAddEdit").validate().resetForm();
}

orders.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 50, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/order',
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
            { data: "supplier.supplier_name", name: "supplier", title: "Nhà cung cấp", sortable: true},
            { data: "total_amount", name: "total_amount", title: "Tổng số lượng", sortable: true},
            { data: "discount", name: "discount", title: "Tổng số tiền được giảm", sortable: true},
            { data: "null", name: "order_detail", title: "Chi tiết đơn hàng", sortable: false,
                "render": function (data) {
                var str = "";
                    $.each(data, function (i, v) {
                        str += "<a class='ml-3' href='javascript:' title='Chi tiết'>${v.name}</a><br>"
                    });
                    return str;
                }
            },
            { data: "finished", name: "finished", title: "Trạng thái", sortable: false,
                "render": function (data) {
                    return data ? "Đã hoàn thành" : "Chưa hoàn thành";
                }
            },
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='orders.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: #ffa500'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='orders.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

orders.get = function (id) {
    var ajaxGet = $.ajax({
        url: "http://localhost:8080/api/order/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#id').val(data.id);
        $('#finished').val(data.finished);
        $('#discount').val(data.discount);
        $('#total_amount').val(data.total_amount);
        $('#supplier').val(data.supplier.id);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

orders.save = function () {
    if ($("#formAddEdit").valid()) {
        var order = {};
        order.id = $('#id').val();
        order.supplier = suppliers.findById(parseInt($('#supplier').val()));
        order.creating_date = null;
        order.discount = $('#discount').val();
        order.total_amount = $('#total_amount').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/order",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(order)
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
                url: "http://localhost:8080/api/order/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(order)
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

orders.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa đơn đặt hàng này không?",
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
                    url: "http://localhost:8080/api/order/" + id,
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





