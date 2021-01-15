var invoices={}||invoices;

invoices.intTable = function () {
    $("#datatables").DataTable({
        "language": {
            "emptyTable": "Không có đơn hàng nào!",
            "lengthMenu": "Hiển thị _MENU_ đơn hàng",
            "search": "Tìm kiếm",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ đơn hàng",
            "paginate": {
                "next": "Trang tiếp",
                "previous": "Trang trước",
            },
        },
        ajax: {
            url: '/api/user/invoice/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "Mã đơn hàng", orderable: true,
            },
            {
                data: "customer", name: "name", title: "Tên khách hàng", orderable: true, "render": function (data){
                    return `${data.customer_fullName}`
                }
            },
            {
                data: "customer", name: "phone", title: "Số điện thoại", orderable: false, "render": function (data){
                    if(data.customer_phone==null) {
                        return 'Không có'
                    } else {
                        return `${data.customer_phone}`
                    }
                }
            },
            {
                data: "finished", name: "finished", title: "Trạng thái đơn hàng", orderable: true, "render": function (data){
                    if(data){
                        return `<a class="text-success">Hoàn thành</a>`
                    } else if(!data) {
                        return `<a class="text-warning">Đang giao dịch</a>`
                    }
                }
            },
            {
                data: "discount", name: "discount", title: "Giảm giá", orderable: true,"render": function (data){
                    var numberFormat = numberWithCommas(data);
                    return `<p class='text-right'>${numberFormat} đ</p>`;
                }
            },
            {
                data: "total_amount", name: "total_amount", title: "Khách phải trả", orderable: true, "render": function (data){
                    var numberFormat = numberWithCommas(data);
                    return `<p class='text-danger text-right font-weight-bold'>${numberFormat} đ</p>`;
                }
            },
            {
                data: "created_at", name: "created_at", title: "Ngày tạo đơn", orderable: true
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    return `<a href='/user/invoices/${data}' title='Xem chi tiết' style='color: blue'><i class="fas fa-eye"></i></a>`;
                }
            }
        ]
    });
}



invoices.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa Hóa đơn này không?",
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
                $.ajax({
                    url: "/api/user/invoice/" + id,
                    method: "DELETE",
                    dataType: "json"
                }).done(function () {
                    console.log("DELETE SUCCESS");
                    $("#datatables").DataTable().ajax.reload();
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                }).fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

invoices.init = function () {
    invoices.intTable();
}

$(document).ready(function () {
    invoices.init();
});
