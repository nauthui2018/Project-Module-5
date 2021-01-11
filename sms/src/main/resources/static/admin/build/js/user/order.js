var orders = {} || orders;
var listOrder = [];
var listNewOrderDetail = [];
var supplier;

orders.init = function () {
    orders.intTable();
    products.listProduct();
    suppliers.listSupplier();
    order_details.listOrderDetail();
    $(function(){
        $('#prime_cost, #order_quantity').keyup(function(){
            var prime_cost = parseFloat($('#prime_cost').val()) || 0;
            var order_quantity = parseFloat($('#order_quantity').val()) || 0;
            $('#amount').val(prime_cost*order_quantity);
        });
    });
}

orders.openModalSelectSupplier = function () {
    orders.resetFormSelectSupplier();
    $('#modalSelectSupplier').modal({
        backdrop: 'static'
    });
}

orders.resetFormSelectSupplier = function () {
    $('#formSelectSupplier')[0].reset();
    $('#supplier').val(0);
}

orders.selectSupplier = function () {
    if ($("#formSelectSupplier").valid()) {
        var supplier_id = $('#supplier').val();
        supplier = suppliers.findById(supplier_id);
    }
    orders.openModalAddEditOrder();
    $('#modalSelectSupplier').modal('hide');
}

orders.openModalAddEditOrder = function () {
    orders.resetFormAddOrderDetail();
    $('.modalAddEditOrder-title').html("Thêm sản phẩm vào đơn hàng");
    $('#modalAddEditOrder').modal({
        backdrop: 'static'
    });
}

orders.resetFormAddOrderDetail = function () {
    $('#formAddOrderDetail')[0].reset();
    $('#product').val(0);
    $('#prime_cost').val('');
    $('#order_quantity').val('');
    $('#amount').val('');
    $('#remark').val('');
    $("#formAddOrderDetail").validate().resetForm();
}

orders.resetFormAddEditOrder = function () {
    orders.resetFormAddOrderDetail();
    listNewOrderDetail = [];
}

orders.addNewOrderDetail = function () {
    if ($("#formAddOrderDetail").valid()) {
        var order_detail = {};
        var order_quantity = $('#order_quantity').val();
        var product_id = parseInt($('#product').val());
        var index = listNewOrderDetail.indexOf(product_id);
        if (index !== -1) {
            order_detail = listNewOrderDetail[index];
            var newOrderQuantity = order_detail.order_quantity + order_quantity;
            order_detail.order_quantity = newOrderQuantity;
            listNewOrderDetail.splice(index, 1, order_detail);
        } else {
            order_detail.prime_cost = $('#prime_cost').val();
            order_detail.remark = $('#remark').val();
            order_detail.order_quantity = order_quantity;
            order_detail.product = products.findById(product_id);
            listNewOrderDetail.push(order_detail);
        }
        orders.showListOrderDetail(listNewOrderDetail);
    }
}

orders.findOrderDetail = function (product_id) {
    for (let i = 0; i < listNewOrderDetail.length; i++) {
        if (product_id === listNewOrderDetail[i].product.id) {
            return listNewOrderDetail[i];
        }
    }
    return null;
}

orders.openModalUpdateOrderDetail = function (product_id) {
    var orderDetail = orders.findOrderDetail(product_id);
    $('#formUpdateOrderDetail')[0].reset();
    $('#new_product').val(product_id);
    $('#new_prime_cost').val(orderDetail.prime_cost);
    $('#new_order_quantity').val(orderDetail.order_quantity);
    var amount = orderDetail.prime_cost*orderDetail.order_quantity;
    $('#new_amount').val(amount);
    $('#new_remark').val(orderDetail.remark);
    var index = listNewOrderDetail.indexOf(product_id);
    $('#index').val(index);
    $('#modalUpdateOrderDetail').modal({
        backdrop: 'static'
    });
}

orders.updateOrderDetail = function () {
    if ($("#formUpdateOrderDetail").valid()) {
        var orderDetail = {};
        var product_id = parseInt($('#new_product').val());
        orderDetail.prime_cost = $('#new_prime_cost').val();
        orderDetail.order_quantity = $('#new_order_quantity').val();
        orderDetail.remark = $('#new_remark').val();
        orderDetail.product = products.findById(product_id);
        var index = parseInt($('#index').val());
        listNewOrderDetail.splice(index, 1, orderDetail);
        orders.showListOrderDetail(listNewOrderDetail);
    }
}

orders.removeOrderDetail = function (product_id) {
    var index = listNewOrderDetail.indexOf(product_id);
    if (index !== -1) {
        listNewOrderDetail.splice(index, 1);
    }
    orders.showListOrderDetail(listNewOrderDetail);
}

orders.showListOrderDetail = function (listNewOrderDetail) {
    var dataTable = $('#orderTable').DataTable();
    dataTable.clear();
    dataTable.draw();
    dataTable.destroy();
    $.each(listNewOrderDetail, function (i, v) {
        var total_amount = v.order_quantity*v.prime_cost;
        $('#orderDetail').append(
            `<tr class="odd pointer"> 
                <td>${v.product.name}</td>  
                <td>${v.prime_cost}</td>           
                <td>${v.order_quantity}</td>
                <td>${total_amount}</td>
                <td>${v.remark}</td>
                <td>
                    <a href='javascript:' title='Cập nhật' onclick='orders.openModalUpdateOrderDetail(${v.product.id})' data-toggle="modal" data-target="#modalOrder" style='color: orange'><i class="fas fa-edit"></i></a>
                    <a class='ml-3' href='javascript:' title='Xóa' onclick='orders.removeOrderDetail(${v.product.id})' style='color: red'><i class="fas fa-trash-alt"></i></a>
                </td>
            </tr>`
        );
    });
    orders.resetFormAddOrderDetail();
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
            // { data: "order_detail.product.name", name: "product", title: "Tên sản phẩm", sortable: true},
            { data: "supplier.name", name: "supplier", title: "Nhà cung cấp", sortable: true},
            { data: "total_amount", name: "total_amount", title: "Tổng số lượng", sortable: true},
            { data: "ordered_date", name: "ordered_date", title: "Ngày đặt hàng", sortable: true},
            // { data: "order_detail", name: "order_detail", title: "Đơn hàng chi tiết", sortable: false,
            //     "render": function (data) {
            //         var listOrderDetailByOrderId = order_details.listOrderDetailByOrderId(data);
            //         var str = "";
            //         for (let i = 0; i < listOrderDetailByOrderId.length; i++) {
            //             var orderDetailId = listOrderDetailByOrderId[i].id;
            //             str += "<a class='ml-3' href='javascript:' title='Chi tiết'>${orderDetailId}</a><br>"
            //         }
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





