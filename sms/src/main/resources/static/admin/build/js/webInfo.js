var webInfos = {} || webInfos;
// var srcLogo="./src/main/resources/static/fe/ui/assets/images";
// var srcBackground="./src/main/resources/static/fe/ui/assets/images/slider";

webInfos.intTable = function () {

    $("#datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/webInfos/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            {
                data: null,
                name: "Checkbox",
                title: "<input type=\"checkbox\" id=\"check-all\" class=\"flat\">",
                orderable: false,
                "render": function () {
                    return '<input type="checkbox" class="flat" name="table_records">';
                }
            },
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "hotline", name: "Hotline", title: "Hotline", orderable: false
            },
            {
                data: "email", name: "Email", title: "Email", orderable: false
            },
            {
                data: "address", name: "Địa chỉ", title: "Địa chỉ", orderable: false
            },
            {
                data: "slogan", name: "Slogan", title: "Slogan", orderable: false
            },
            {
                data: "logo1", name: "Logo1", title: "Logo1", orderable: false, "render": data => {
                    return `<img src="${data}" alt="logo1"/>`
                },

            },
            {
                data: "logo2", name: "Logo2", title: "Logo2", orderable: false, "render": data => {
                    return `<img src="${data}" alt="logo2"/>`
                }
            },
            {
                data: "id", name: "Thao tác", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = `<a href='/webInfo/update/${data}' title='Sửa Web Info' style='color: orange'><i class="fas fa-edit"></i></a>
                        <a href='javascript:' title='Xóa Web Info' onclick='webInfos.delete(${data})' style='color: red'><i class="fas fa-trash-alt"></i></a>`
                    return str;
                }
            }
        ]
    });
};

webInfos.addNew = function () {
    $('#modalTitle').html("Thêm Web Info mới");
    webInfos.resetForm();
    $('#modalAddEdit').modal('show');
}

webInfos.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $("#formAddEdit").validate().resetForm();
}

webInfos.upload= function (field,idForm) {
    var fd = new FormData();
    fd.append( 'file', $('#'+idForm)[0].files[0]);
    fd.append("id",$(".id").val()[0]);
    // use $.ajax() to upload file
    $.ajax({
        url: "http://localhost:8080/api/webInfos/"+field,
        type: "POST",
        data: fd,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
    })
        .done(function () {
            $('.modal').modal('hide');
            toastr.info('Thêm ảnh thành công', 'INFORMATION:')
        }).fail(function () {
        $('.modal').modal('hide');
        toastr.error('Thêm không thành công', 'INFORMATION:')

    });
}

function readURL(input, field) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#'+field).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#imglogo1").change(function() {
    readURL(this,"logo1");
});

$("#imglogo2").change(function() {
    readURL(this,"logo2");
});

$("#imgBackground1").change(function() {
    readURL(this,"background1");
});

$("#imgBackground2").change(function() {
    readURL(this,"background2");
});

$("#imgBackground3").change(function() {
    readURL(this,"background3");
});

webInfos.get = function (id) {
    console.log('get :' + id);
    $.ajax({
        url: "http://localhost:8080/api/webInfos/" + id,
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        $('#formAddEdit')[0].reset();
        $('#modalTitle').html("Chỉnh sửa Web Info");
        $('#id').val(data.id);
        $('#hotline').val(data.hotline);
        $('#email').val(data.email);
        $('#address').val(data.address);
        $('#slogan').val(data.slogan);
        $('#description_slogan').val(data.description_slogan);
        $('#modalAddEdit').modal('show');
    }).fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

webInfos.save = function () {
        if ($('#id').val() == 0) {
            var webInfoObj = {};
            webInfoObj.hotline = $('#hotline').val();
            webInfoObj.email = $('#email').val();
            webInfoObj.address = $('#address').val();
            webInfoObj.slogan = $('#slogan').val();
            webInfoObj.description_slogan = $('#description_slogan').val();

            $.ajax({
                url: "http://localhost:8080/api/webInfos/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(webInfoObj)
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
            var webInfoObj = {};
            webInfoObj.hotline = $('#hotline').val();
            webInfoObj.email = $('#email').val();
            webInfoObj.address = $('#address').val();
            webInfoObj.slogan = $('#slogan').val();
            webInfoObj.description_slogan = $('#description_slogan').val();
            webInfoObj.about_us = $('#summernote').val();
            webInfoObj.id = $('#id').val();
            webInfoObj.logo1 =$('#imageLogo1').val();
            webInfoObj.logo2 =$('#imageLogo2').val();
            webInfoObj.background1 = $('#imageBackground1').val();
            webInfoObj.background2 = $('#imageBackground2').val();
            webInfoObj.background3 = $('#imageBackground3').val();
            $.ajax({
                url: "http://localhost:8080/api/webInfos/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(webInfoObj)
            }).done(function () {
                toastr.info('Cập nhật thành công', 'INFORMATION:')
            }).fail(function () {
                toastr.error('Cập nhật không thành công', 'INFORMATION:')
            });
        return false;
    }
}
webInfos.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa Web Info này không?",
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
                    url: "http://localhost:8080/api/webInfos/" + id,
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


webInfos.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            hotline: {
                required: true,
                maxlength: 15,
                minlength: 10
            },
            email: {
                required: true,
                maxlength: 60
            },
            address: {
                required: true,
                maxlength: 60,
                minlength: 5
            },
            slogan: {
                required: true,
                maxlength: 20
            },
            about_us: {
                required: true
            },
            background1: {
                required: true
            },
            background2: {
                required: true
            },
            background3: {
                required: true
            },
            logo1: {
                required: true
            },
            logo2: {
                required: true
            }
        },
        messages: {
            hotline: {
                required: "Vui lòng nhập hotline!",
                maxlength: "Vui lòng nhập từ 10-15 ký tự",
                minlength: "Vui lòng nhập từ 10-15 ký tự"
            },
            email: {
                required: "Vui lòng nhập email",
                maxlength: "Độ dài tối đa 60 ký tự"
            },
            address: {
                required: "Vui lòng nhập địa chỉ",
                maxlength: "Vui lòng nhập từ 5-60 ký tự",
                minlength: "Vui lòng nhập từ 5-60 ký tự"
            },
            slogan: {
                required: "Vui lòng nhập slogan",
                maxlength: "Độ dài tối đa 20 ký tự"
            },
            about_us: {
                required: "Vui lòng nhập phần giới thiệu"
            },
            background1: {
                required: "Vui lòng upload ảnh background thứ 1"
            },
            background2: {
                required: "Vui lòng upload ảnh background thứ 2"
            },
            background3: {
                required: "Vui lòng upload ảnh background thứ 3"
            },
            logo1: {
                required: "Vui lòng upload logo thứ 1"
            },
            logo2: {
                required: "Vui lòng upload logo thứ 2"
            }
        }
    });
}

webInfos.init = function () {
    webInfos.intTable();
    webInfos.initValidation();
    $('#summernote').summernote();
}

$(document).ready(function () {
    webInfos.init();
});