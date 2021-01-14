var orders = {} || orders;
var listOrder = [];
var listNewOrderDetail = [];
var supplier_id;
var newOrder;
var listOrderDetailByOrderId = [];

orders.init = function () {
    products.listProduct();
    suppliers.listSupplier();
    order_details.listOrderDetail();
    orders.listOrder();
    orders.intTable();
    $(function(){
        $('#prime_cost, #order_quantity').keyup(function(){
            var prime_cost = parseFloat($('#prime_cost').val()) || 0;
            var order_quantity = parseFloat($('#order_quantity').val()) || 0;
            $('#amount').val(prime_cost*order_quantity);
        });
    });
    $(function(){
        $('#new_prime_cost, #new_order_quantity').keyup(function(){
            var new_prime_cost = parseFloat($('#new_prime_cost').val()) || 0;
            var new_order_quantity = parseFloat($('#new_order_quantity').val()) || 0;
            $('#new_amount').val(new_prime_cost*new_order_quantity);
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
        supplier_id = $('#supplier').val();
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
        var order_quantity = parseInt($('#order_quantity').val());
        var product_id = parseInt($('#product').val());
        var prime_cost = $('#prime_cost').val();
        var remark = $('#remark').val();
        order_detail.prime_cost = prime_cost;
        order_detail.remark = remark;
        order_detail.order_quantity = order_quantity;
        order_detail.product = products.findById(product_id);
        var isExisted = orders.findOrderDetail(order_detail);
        if (!isExisted) {
            listNewOrderDetail.push(order_detail);
        } else {
            var index = orders.findIndex(order_detail)
            var current_order_detail = listNewOrderDetail[index];
            var new_order_quantity = current_order_detail.order_quantity + order_quantity;
            current_order_detail.order_quantity = new_order_quantity;
            if (remark != "") {
                current_order_detail.remark = remark;
            }
            listNewOrderDetail.splice(index, 1, current_order_detail);
        }
        orders.showListOrderDetail(listNewOrderDetail);
    }
}

orders.findOrderDetail = function (orderDetail) {
    var isExisted = false;
    var product_id = orderDetail.product.id;
    var prime_cost = orderDetail.prime_cost;
    for (let i = 0; i < listNewOrderDetail.length; i++) {
        var item = listNewOrderDetail[i];
        if (product_id == item.product.id && prime_cost == item.prime_cost) {
            isExisted = true;
        }
    }
    return isExisted;
}

orders.findIndex = function (orderDetail) {
    var index = -1;
    var product_id = orderDetail.product.id;
    var prime_cost = orderDetail.prime_cost;
    for (let i = 0; i < listNewOrderDetail.length; i++) {
        var item = listNewOrderDetail[i];
        if (product_id == item.product.id && prime_cost == item.prime_cost) {
            index = i;
        }
    }
    return index;
}

orders.openModalUpdateOrderDetail = function (index) {
    orders.resetFormAddOrderDetail();
    var orderDetail = listNewOrderDetail[index];
    $('#formUpdateOrderDetail')[0].reset();
    $('#new_product').val(orderDetail.product.id);
    $('#new_prime_cost').val(orderDetail.prime_cost);
    $('#new_order_quantity').val(orderDetail.order_quantity);
    var amount = orderDetail.prime_cost*orderDetail.order_quantity;
    $('#new_amount').val(amount);
    $('#new_remark').val(orderDetail.remark);
    $('#index').val(index);
    $('#modalUpdateOrderDetail').modal({
        backdrop: 'static'
    });
}

orders.updateOrderDetail = function () {
    if ($("#formUpdateOrderDetail").valid()) {
        var order_detail = {};
        var new_order_quantity = parseInt($('#new_order_quantity').val());
        var new_product_id = parseInt($('#new_product').val());
        var new_prime_cost = $('#new_prime_cost').val();
        var new_remark = $('#new_remark').val();
        order_detail.prime_cost = new_prime_cost;
        order_detail.remark = new_remark;
        order_detail.order_quantity = new_order_quantity;
        order_detail.product = products.findById(new_product_id);
        var old_index = parseInt($('#index').val());
        var isExisted = orders.findOrderDetail(order_detail);
        var index = orders.findIndex(order_detail)
        if (!isExisted || index == old_index) {
            listNewOrderDetail.splice(old_index, 1, order_detail);
        } else {
            var current_order_detail = listNewOrderDetail[index];
            var order_quantity = current_order_detail.order_quantity + new_order_quantity;
            current_order_detail.order_quantity = order_quantity;
            if (new_remark != "") {
                current_order_detail.remark = new_remark;
            }
            listNewOrderDetail.splice(index, 1, current_order_detail);
            listNewOrderDetail.splice(old_index, 1);
        }
        orders.showListOrderDetail(listNewOrderDetail);
        $('#modalUpdateOrderDetail').modal('hide');
    }
}

orders.removeOrderDetail = function (product_id) {
    var index = listNewOrderDetail.indexOf(product_id);
        bootbox.confirm({
            message: "Bạn có muốn xóa sản phẩm này khỏi đơn hàng không?",
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
                    listNewOrderDetail.splice(index, 1);
                    orders.showListOrderDetail(listNewOrderDetail);
                }
            }
        })
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
                    <a href='javascript:' title='Cập nhật' onclick='orders.openModalUpdateOrderDetail(${i})' data-toggle="modal" style='color: orange'><i class="fas fa-edit"></i></a>
                    <a class='ml-3' href='javascript:' title='Xóa' onclick='orders.removeOrderDetail(${v.product.id})' style='color: red'><i class="fas fa-trash-alt"></i></a>
                </td>
            </tr>`
        );
    });
    orders.resetFormAddOrderDetail();
}

orders.listByOrderId = function (order_id) {
    listOrderDetailByOrderId = [];
    for (let i = 0; i < listOrderDetail.length; i++) {
        var orderId = listOrderDetail[i].order.id;
        if (order_id == orderId) {
            listOrderDetailByOrderId.push(listOrderDetail[i]);
        }
    }
}

orders.openModalOrderInformation = function (id) {
    var order = orders.findById(id);
    $('.order_id').html("ID đơn hàng: " + order.id);
    $('.order_date').html("Ngày đặt hàng: " + order.ordered_date);
    $('.order_amount').html("Tổng tiền: " + order.total_amount);
    $('#modalShowOrderDetail').modal({
        backdrop: 'static'
    });
    orders.listByOrderId(id);
    var dataTable = $('#orderDetailTable').DataTable();
    dataTable.clear();
    dataTable.draw();
    dataTable.destroy();
    $.each(listOrderDetailByOrderId, function (i, v) {
        $('#orderDetailData').append(
            `<tr class="odd pointer"> 
                <td>${v.id}</td>  
                <td>${v.product.name}</td>           
                <td>${v.prime_cost}</td>
                <td>${v.order_quantity}</td>
                <td>${v.remark}</td>
            </tr>`
        );
    });
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
            { data: "supplier.name", name: "supplier", title: "Nhà cung cấp", sortable: true},
            { data: "total_amount", name: "total_amount", title: "Tổng tiền", sortable: true},
            { data: "ordered_date", name: "ordered_date", title: "Ngày đặt hàng", sortable: true},
            { data: "finished", name: "finished", title: "Trạng thái", sortable: false,
                "render": function (data) {
                    return data ? "Đã hoàn thành" : "Chưa hoàn thành";
                }
            },
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='orders.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: #ffa500'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-2' href='javascript:' title='Xóa' onclick='orders.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>" +
                        "<a class='ml-2' href='javascript:' title='Xem' onclick='orders.openModalOrderInformation(" + data + ")' data-toggle=\"modal\" style='color: dodgerblue'><i class=\"fas fa-info-circle\"></i></a> "
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

orders.getTotalAmount = function () {
    var totalAmount = 0;
    for (let i = 0; i < listNewOrderDetail.length; i++) {
        var prime_cost = listNewOrderDetail[i].prime_cost;
        var order_quantity = listNewOrderDetail[i].order_quantity;
        totalAmount += prime_cost * order_quantity;
    }
    return totalAmount;
}

orders.save = function () {
    if ($("#formAddEditOrder").valid()) {
        var order = {};
        order.id = $('#id').val();
        order.supplier = suppliers.findById(parseInt(supplier_id));
        order.creating_date = null;
        order.total_amount = orders.getTotalAmount();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "/api/user/order",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(order)
            });
            ajaxAdd.done(function (data) {
                var order = {};
                order.id = data.id;
                $('#modalAddEditOrder').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Tạo thành công', 'INFORMATION:');
                setTimeout(() => {
                    for (let i = 0; i < listNewOrderDetail.length; i++) {
                        var orderDetail = listNewOrderDetail[i];
                        var product = {};
                        product.id = orderDetail.product.id;
                        orderDetail.order = order;
                        orderDetail.product = product;
                        order_details.save(orderDetail);
                    }
                }, 500);
            });
            ajaxAdd.fail(function () {
                $('#modalAddEditOrder').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Tạo không thành công', 'INFORMATION:');
            });
        // } else {
        //     var ajaxUpdate = $.ajax({
        //         url: "/api/user/order/",
        //         method: "PUT",
        //         dataType: "json",
        //         contentType: "application/json",
        //         data: JSON.stringify(order)
        //     });
        //     ajaxUpdate.done(function () {
        //         $('#modalAddEditOrder').modal('hide');
        //         $("#datatables").DataTable().ajax.reload();
        //         toastr.info('Cập nhật thành công', 'INFORMATION:')
        //     });
        //     ajaxUpdate.fail(function () {
        //         $('#modalAddEditOrder').modal('hide');
        //         $("#datatables").DataTable().ajax.reload();
        //         toastr.error('Cập nhật không thành công', 'INFORMATION:')
        //
        //     });
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





