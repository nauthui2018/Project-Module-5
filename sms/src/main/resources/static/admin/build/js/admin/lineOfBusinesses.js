var lineOfBusinesses = {} || lineOfBusinesses;

lineOfBusinesses.intTable = function () {
    $("#datatables").DataTable({
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        "language": {
            "emptyTable": "Không có mặt hàng kinh doanh nào!",
            "lengthMenu": "Hiển thị _MENU_ mặt hàng",
            "search": "Tìm kiếm",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ mặt hàng",
            "paginate": {
                "next": "Trang tiếp",
                "previous": "Trang trước",
            },
        },
        ajax: {
            url: '/api/admin/lob/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "name", name: "Tên mặt hàng kinh doanh", title: "Tên mặt hàng kinh doanh", orderable: true
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Sửa' onclick='lineOfBusinesses.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a href='javascript:' title='Xóa' onclick='lineOfBusinesses.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
};

lineOfBusinesses.addNew = function () {
    $('#modalTitle').html("Thêm Mặt hàng kinh doanh mới");
    lineOfBusinesses.resetForm();
    $('#modalAddEdit').modal('show');
}

lineOfBusinesses.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $("#formAddEdit").validate().resetForm();
}


lineOfBusinesses.get = function (id) {
    console.log('get :' + id);
    $.ajax({
        url: "/api/admin/lob/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#modalTitle').html("Chỉnh sửa thông tin");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#modalAddEdit').modal('show');
    }).fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

lineOfBusinesses.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var lobObj = {};
            lobObj.name = $('#name').val();

            $.ajax({
                url: "/api/admin/lob/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(lobObj)
            }).done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm thành công', 'INFORMATION:')
            }).fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Thêm không thành công', 'INFORMATION:')

            });
        } else {
            var lobObj = {};
            lobObj.name = $('#name').val();
            lobObj.id = $('#id').val();
            $.ajax({
                url: "/api/admin/lob/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(lobObj)
            }).done(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Cập nhật thành công', 'INFORMATION:')
            }).fail(function () {
                console.log("POST ");
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Cập nhật không thành công', 'INFORMATION:')

            });
        }
        return false;
    }
}
lineOfBusinesses.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa mặt hàng này không?",
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
                    url: "/api/admin/lob/" + id,
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


lineOfBusinesses.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                maxlength: 150
            }
        },
        messages: {
            name: {
                required: "Vui lòng nhập Tên",
                maxlength: 150
            }
        }
    });
}

lineOfBusinesses.init = function () {
    lineOfBusinesses.intTable();
    lineOfBusinesses.initValidation();
}

$(document).ready(function () {
    lineOfBusinesses.init();
});
