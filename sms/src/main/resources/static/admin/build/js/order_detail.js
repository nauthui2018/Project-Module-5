let order_details = {} || order_details;
var list_order_detail = [];
var all_order_detail = [];

$(document).ready(function () {
    order_details.init();
});

order_details.init = function () {
    order_details.intTable();
    order_details.getAllOrderDetail();
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
            url: 'http://localhost:8080/api/order_detail/',
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

order_details.get = function (id) {
    var ajaxGet = $.ajax({
        url: "http://localhost:8080/api/order_detail/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#product_type').val(0);
        $('#warehouse').val(0);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

order_details.getAllOrderDetail = function () {
    $.ajax({
        url: "http://localhost:8080/api/order_detail",
        method: "GET",
        dataType: "json",
        success: function (data) {
            all_order_detail = data;
            $.each(data, function (i, v) {
                $('#order_detail').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

order_details.findById = function (id) {
    for (let i = 0; i < all_order_detail.length; i++) {
        if (id === all_order_detail[i].id) {
            return all_order_detail[i];
        }
    }
    return null;
}

order_details.findByOrderId = function (id) {
    for (let i = 0; i < all_order_detail.length; i++) {
        if (id === all_order_detail[i].order.id) {
            list_order_detail.push(all_order_detail[i]);
        }
    }
    return list_order_detail;
}


