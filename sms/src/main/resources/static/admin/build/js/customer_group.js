var customer_groups = {} || customer_groups;

$(document).ready(function () {
    customer_groups.init();
});

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
    $('#creating_date').val('');
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
        "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
        ajax: {
            url: 'http://localhost:8080/api/customer_group/',
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
        url: "http://localhost:8080/api/customer_group/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#creating_date').val(data.creating_date);
        $('#deleted').val(data.deleted);
        $('#modalAddEdit').modal('show');
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

customer_groups.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() === '') {
            var new_customer_group = {};
            new_customer_group.name = $('#name').val();
            new_customer_group.creating_date = new Date().toLocaleString();
            var ajaxAdd = $.ajax({
                url: "http://localhost:8080/api/customer_group",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(new_customer_group)
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
            var customer_group = {};
            customer_group.id = $('#id').val();
            customer_group.name = $('#name').val();
            customer_group.creating_date = $('#creating_date').val();
            customer_group.deleted = $('#deleted').val();
            var ajaxUpdate = $.ajax({
                url: "http://localhost:8080/api/customer_group/",
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
                console.log("POST ");
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
                    url: "http://localhost:8080/api/customer_group/" + id,
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

