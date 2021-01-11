var orders = {} || orders;
var listOrder = [];

orders.init = function () {
    orders.intTable();
    products.listProduct();
    suppliers.listSupplier();
    order_details.listOrderDetail();
}

orders.addNew = function () {
    $('.modal-title').html("Tạo đơn đặt hàng mới");
    orders.resetForm();
    $('#modalAddEdit').modal({
        backdrop: 'static'
    });
}

orders.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $("#formAddEdit").validate().resetForm();
}

orders.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        ajax: {
            url: "/api/user/order",
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id", name: "id", title: "ID", sortable: false},
            // { data: "supplier.name", name: "supplier", title: "Nhà cung cấp", sortable: true},
            { data: "total_amount", name: "total_amount", title: "Tổng số lượng", sortable: true},
            // { data: "id", name: "order_detail", title: "Chi tiết đơn hàng", sortable: false,
            //     "render": function (data) {
            //     var list_order_detail = order_details.findByOrderId(data);
            //     var str = "";
            //         $.each(list_order_detail, function (i, v) {
            //             str += "<a class='ml-3' href='javascript:' title='Chi tiết'>${v.id}</a><br>"
            //         });
            //         return str;
            //     }
            // },
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
        url: "/api/user/order" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#id').val(data.id);
        $('#finished').val(data.finished);
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
                url: "/api/user/order",
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
                url: "/api/user/order/",
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
                    url: "/api/user/order/" + id,
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

orders.listOrder = function () {
    $.ajax({
        url: "/api/user/order",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listOrder = data;
            $.each(data, function (i, v) {
                $('#order').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

orders.findById = function (id) {
    for (let i = 0; i < listOrder.length; i++) {
        if (id === listOrder[i].id) {
            return listOrder[i];
        }
    }
    return null;
}



orders.showListOrderedProduct = function (data) {
    data = listOrderedProduct
    $.each(data, function (i, v) {
        $('#formOrder').append(
            `<tr class="odd pointer"> 
                <td>${v.product.name}</td>             
                <td>${v.order_quantity}</td>
                <td>${v.prime_cost}</td>
                <td>${v.order_quantity}*${v.prime_cost}</td>
                <td>
                    <a href='javascript:' title='Cập nhật' onclick='products.get(${data})' data-toggle="modal" data-target="#modalAddEdit" style='color: orange'><i class="fas fa-edit"></i></a>
                    <a class='ml-3' href='javascript:' title='Xóa' onclick='products.delete(${data})' style='color: red'><i class="fas fa-trash-alt"></i></a>
                </td>
            </tr>`
        );
    });
}





