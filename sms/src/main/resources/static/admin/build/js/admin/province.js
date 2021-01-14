var provinces = {} || provinces;

provinces.intTable = function () {
    $("#datatables").DataTable({
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
        "language": {
            "emptyTable": "Không có tỉnh thành nào!",
            "lengthMenu": "Hiển thị _MENU_ tỉnh thành",
            "search": "Tìm kiếm",
            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ tỉnh thành",
            "paginate": {
                "next": "Trang tiếp",
                "previous": "Trang trước",
            },
        },
        ajax: {
            url: '/api/admin/province/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "name", name: "Tên Tỉnh Thành", title: "Tên tỉnh thành", orderable: true
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Sửa Tỉnh thành' onclick='provinces.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a href='javascript:' title='Xóa Tỉnh thành' onclick='provinces.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
};

provinces.addNew = function () {
    $('#modalTitle').html("Thêm Tỉnh thành mới");
    provinces.resetForm();
    $('#modalAddEdit').modal('show');
}

provinces.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $("#formAddEdit").validate().resetForm();
}


provinces.get = function (id) {
    $.ajax({
        url: "/api/admin/province/" + id,
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

provinces.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var provinceObj = {};
            provinceObj.name = $('#name').val();

            $.ajax({
                url: "/api/admin/province/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(provinceObj)
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
            var provinceObj = {};
            provinceObj.name = $('#name').val();
            provinceObj.id = $('#id').val();
            $.ajax({
                url: "/api/admin/province/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(provinceObj)
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
provinces.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa Tỉnh thành này không?",
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
                    url: "/api/admin/province/" + id,
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


provinces.initValidation = function () {
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

provinces.init = function () {
    provinces.intTable();
    provinces.initValidation();
}

$(document).ready(function () {
    provinces.init();
});
