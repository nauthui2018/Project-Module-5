var invoiceDetail={}||invoiceDetail;

invoiceDetail.intInvoiceDetailTable = function () {
    var id=$('#idInvoice').val();
    $("#invoiceDetailTable").DataTable({
        "lengthMenu":false,
        "searching": false,
        "paginate": false,
        "language": {
            "info": "Có tất cả _TOTAL_ đơn hàng",
        },
        ajax: {
            url: '/api/user/invoiceDetail/invoice/'+id,
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "product", name: "productID", title: "Mã sản phẩm", orderable: true,"render":function (data){
                    return `${data.id}`
                }
            },
            {
                data: "product", name: "productName", title: "Tên sản phẩm", orderable: true, "render": function (data){
                    return `${data.name}`
                }
            },
            {
                data: "quantity", name: "quantity", title: "Số lượng", orderable: false,
            },
            {
                data: "retail_price", name: "retail_price", title: "Đơn giá", orderable: true, "render": function (data){
                    var numberFormat = numberWithCommas(data);
                    return `<p class='text-right'>${numberFormat} đ</p>`;
                }
            },
            {
                data: "amount", name: "amount", title: "Thành tiền", orderable: true, "render": function (data){
                    var numberFormat = numberWithCommas(data);
                    return `<p class='text-danger text-right font-weight-bold'>${numberFormat} đ</p>`;
                }
            },
        ],
    });
}

invoiceDetail.finished= function (id){
    bootbox.confirm({
        message: "Xác nhận đơn đã hoàn thành?",
        buttons: {
            confirm: {
                label: 'Đúng',
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
                    url: "/api/user/invoice/finished/"+id,
                    method: "GET",
                    dataType: "json"
                }).done(function () {
                    setTimeout(function () {
                            location.href = "/user/invoices"
                        },1000);
                    toastr.info('Đã thanh toán!', 'INFORMATION:')

                }).fail(function () {
                    toastr.error('Thanh toán không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}

invoiceDetail.delete = function (id){
    bootbox.confirm({
        message: "Bạn có muốn hủy bỏ hóa đơn này không?",
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
                    setTimeout(function () {
                        location.href = "/user/invoices"
                    }, 1000);
                    toastr.info('Xóa thành công!', 'INFORMATION:')

                }).fail(function (xhr) {
                    if(xhr==404){
                        toastr.error('Xóa không thành công!', 'INFORMATION:')
                    }
                });
            }
        }
    })
}

invoiceDetail.getTotalAmount= function (){
    var totalMoneyAmount=0;
    var id=$('#idInvoice').val();
    $.ajax({
        url: '/api/user/invoiceDetail/invoice/'+id,
            method: "GET",
            datatype: "json",
            dataSrc: ""
    }).done(function (data){
        data.forEach(e=>{
            totalMoneyAmount+=e.amount;
        })

        $('#totalAmount').html(numberWithCommas(totalMoneyAmount)+' đ');
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

invoiceDetail.init = function () {
    invoiceDetail.intInvoiceDetailTable();
}

$(document).ready(function () {
    $('#discountAmount').html(numberWithCommas($('#discountAmount').html())+' đ');
    $('#moneyAmount').html(numberWithCommas($('#moneyAmount').html())+' đ');
    invoiceDetail.init();
    invoiceDetail.getTotalAmount()
});
