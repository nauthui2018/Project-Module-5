var lineOfBusinesses = {} || lineOfBusinesses;

lineOfBusinesses.intTable = function () {
    $("#datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/lobs/',
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
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "name", name: "Tên Lĩnh vực kinh doanh", title: "Tên Lĩnh vực kinh doanh", orderable: true
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = "<a href='javascript:' title='Sửa Lĩnh vực kinh doanh' onclick='lineOfBusinesses.get(" + data + ")' data-toggle=\"modal\" data-target=\"#modalAddEdit\" style='color: orange'><i class=\"fas fa-edit\"></i></a> " +
                        "<a href='javascript:' title='Xóa Lĩnh vực kinh doanh' onclick='lineOfBusinesses.delete(" + data + ")' style='color: red'><i class=\"fas fa-trash-alt\"></i></a>"
                    return str;
                }
            }
        ]
    });
};

lineOfBusinesses.addNew = function () {
    $('#modalTitle').html("Thêm Lĩnh vực kinh doanh mới");
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
        url: "http://localhost:8080/api/lobs/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#modalTitle').html("Chỉnh sửa Lĩnh vực kinh doanh");
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
                url: "http://localhost:8080/api/lobs/",
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
                url: "http://localhost:8080/api/lobs/",
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
        message: "Bạn có muốn xóa lĩnh vực kinh doanh này không?",
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
                    url: "http://localhost:8080/api/lobs/" + id,
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
