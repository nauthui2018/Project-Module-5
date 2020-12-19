var customer_groups = {} || customer_groups;
var customers = {} || customers;
var listCustomerGroup = [];


$(document).ready(function () {
    customers.init();
});

customers.init = function () {
    customers.intTable();
    customers.initValidation();
    customer_groups.listCustomerGroup();
}

customers.addNew = function () {
    $('.modal-title').html("Thêm khách hàng mới");
    customers.resetForm();
    $('#modalAddEdit').modal('show');
}

customers.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#customer_fullName').val('');
    $('#customer_phone').val('');
    $('#customer_email').val('');
    $('#customer_address').val('');
    $('#gender').val('');
    $('#deleted').val('');
    $('#customer_group').val(0);
    $("#formAddEdit").validate().resetForm();
}

customers.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            customer_fullName: {
                required: true,
                maxlength: 150,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập nhóm khách hàng",
                maxlength: "Tên nhóm quá dài. Bạn vui lòng kiểm tra lại!",
            },
        },
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

customers.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/customer/',
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
            { data: "customer_fullName", name: "customer_fullName", title: "Tên khách hàng", orderable: false},
            { data: "customer_group.name", name: "customer_group", title: "Nhóm khách hàng", orderable: true},
            { data: "customer_phone", name: "customer_phone", title: "Số điện thoại", orderable: false},
            { data: "gender", name: "gender", title: "Giới tính", orderable: false},
            { data: "customer_address", name: "customer_address", title: "Địa chỉ", orderable: false},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='customers.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: #ffa500'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='customers.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

customers.get = function (id) {
    var ajaxGet = $.ajax({
        url: "http://localhost:8080/api/customer/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#id').val(data.id);
        $('#customer_fullName').val(data.customer_fullName);
        $('#customer_group').val(data.customer_group.id);
        $('#customer_phone').val(data.customer_phone);
        $('#customer_email').val(data.customer_email);
        $('#customer_address').val(data.customer_address);
        $('#gender').val(data.gender);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

customer_groups.listCustomerGroup = function () {
    $.ajax({
        url: "http://localhost:8080/api/customer_group",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listCustomerGroup = data;
            $.each(data, function (i, v) {
                $('#customer_group').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

customer_groups.findById = function (id) {
    for (let i = 0; i < listCustomerGroup.length; i++) {
        if (id === listCustomerGroup[i].id) {
            return listCustomerGroup[i];
        }
    }
    return null;
}

customers.save = function () {
    if ($("#formAddEdit").valid()) {
        var customer = {};
        customer.customer_fullName = $('#customer_fullName').val();
        customer.customer_group = customer_groups.findById(parseInt($('#customer_group').val()));
        customer.customer_phone = $('#customer_phone').val();
        customer.customer_email = $('#customer_email').val();
        customer.customer_address = $('#customer_address').val();
        customer.gender = $('#gender').val();
        customer.deleted = $('#deleted').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/customer",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(customer)
            });
            ajaxAdd.done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm thành công', 'INFORMATION:');
            });
            ajaxAdd.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Thêm không thành công', 'INFORMATION:');
            });
        } else {
            var ajaxUpdate = $.ajax({
                url: "http://localhost:8080/api/customer/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(customer)
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

customers.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa khách hàng này không?",
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
                    url: "http://localhost:8080/api/customer/" + id,
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

