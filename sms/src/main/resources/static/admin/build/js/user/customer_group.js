var customer_groups = {} || customer_groups;
var listCustomerGroup = [];

customer_groups.init = function () {
    customer_groups.intTable();
    customer_groups.initValidation();
}

customer_groups.addNew = function () {
    $('.modal-title').html("Thêm nhóm khách hàng mới");
    customer_groups.resetForm();
    $('#modalAddEdit').modal('show');
}

customer_groups.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $('#id').val('');
    $('#deleted').val('');
    $("#formAddEdit").validate().resetForm();
}

customer_groups.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                minlength: 5,
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

customer_groups.intTable = function () {
    $("#datatables").DataTable({
        destroy: true,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        ajax: {
            url: "/api/user/customer_group/",
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id", name: "ID", title: "ID", orderable: false},
            { data: "name", name: "Nhóm khách hàng", title: "Nhóm khách hàng", orderable: true},
            { data: "creating_date", name: "Ngày tạo", title: "Ngày tạo", orderable: true},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Cập nhật' onclick='customer_groups.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a class='ml-3' href='javascript:' title='Xóa' onclick='customer_groups.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
}

customer_groups.get = function (id) {
    var ajaxGet = $.ajax({
        url: "/api/user/customer_group/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

customer_groups.save = function () {
    if ($("#formAddEdit").valid()) {
        var customer_group = {};
        customer_group.id = $('#id').val();
        customer_group.name = $('#name').val();
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "/api/user/customer_group",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(customer_group)
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
            customer_group.deleted = $('#deleted').val();
            var ajaxUpdate = $.ajax({
                url: "/api/user/customer_group/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(customer_group)
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

customer_groups.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa nhóm khách hàng này không?",
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
                    url: "/api/user/customer_group/" + id,
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

customer_groups.listCustomerGroup = function () {
    $.ajax({
        url: "/api/user/customer_group",
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

