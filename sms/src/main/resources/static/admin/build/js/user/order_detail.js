let order_details = {} || order_details;
var listOrderDetail = [];
var listOrderDetailByOrderId = [];

order_details.init = function () {
    order_details.intTable();
    products.listProduct();
    suppliers.listSupplier();
    orders.listOrder();
}

order_details.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        "language": {
            "emptyTable": "Không có đơn hàng nào!",
            "lengthMenu": "Hiển thị _MENU_ đơn hàng",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ đơn hàng",
            "paginate": {
                "next": "Trang tiếp",
                "previous": "Trang trước",
            },
        },
        ajax: {
            url: "/api/user/order_detail/",
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id", name: "ID", title: "ID", sortable: false},
            { data: "product.name", name: "product", title: "Sản phẩm", sortable: true},
            { data: "order_quantity", name: "order_quantity", title: "Số lượng đặt hàng", sortable: false},
            { data: "prime_cost", name: "prime_cost", title: "Giá nhập", sortable: false},
            { data: "order.ordered_date", name: "ordered_date", title: "Ngày đặt hàng", sortable: false},
            { data: "supplier.name", name: "supplier", title: "Nhà cung cấp", sortable: false},
            { data: "order.finished", name: "finished", title: "Trạng thái", sortable: false,
                "render": function (data) {
                    return data ? "Đã hoàn thành" : "Chưa hoàn thành";
                }
            }
        ]
    });
}

order_details.get = function (id) {
    var ajaxGet = $.ajax({
        url: "/api/user/order_detail/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#prime_cost').val(data.prime_cost);
        $('#order_quantity').val(data.order_quantity);
        $('#stock').val(data.stock);
        $('#scrap').val(data.scrap);
        $('#deleted').val(data.deleted);
        $('#remark').val(data.remark);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

order_details.listOrderDetail = function () {
    $.ajax({
        url: "/api/user/order_detail",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listOrderDetail = data;
            $.each(data, function (i, v) {
                $('#order_detail').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

order_details.findById = function (id) {
    for (let i = 0; i < listOrderDetail.length; i++) {
        if (id === listOrderDetail[i].id) {
            return listOrderDetail[i];
        }
    }
    return null;
}

order_details.listOrderedProduct = function () {
    if ($("#formOrder").valid()) {
        var order_detail = {};
        var order_quantity = $('#order_quantity').val();
        var product_id = parseInt($('#product').val());
        var index = listOrderedProduct.indexOf(product_id);
        if (index !== -1) {
            order_detail = listOrderedProduct[index];
            var newOrderQuantity = order_detail.order_quantity + order_quantity;
            order_detail.order_quantity = newOrderQuantity;
            listOrderedProduct.splice(index, 1, order_detail);
        } else {
            order_detail.prime_cost = $('#prime_cost').val();
            order_detail.order_quantity = order_quantity;
            order_detail.product = products.findById(product_id);
            listOrderedProduct.push(order_detail);
        }
    }
}

order_details.removeProductOutOfOrderedList = function (product_id) {
    var index = listOrderedProduct.indexOf(product_id);
    if (index !== -1) {
        listOrderedProduct.splice(index, 1);
    }
    return listOrderedProduct;
}

order_details.save = function () {
    for (let i = 0; i < listOrderedProduct.length; i++) {
        $.ajax({
            url: "/api/user/order_detail",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(listOrderedProduct[i])
        });
    }
}

