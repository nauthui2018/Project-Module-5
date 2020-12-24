var users = {} || users;

users.intTable = function () {
    $("#datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/user/',
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
                data: "user_avatar", name: "Avatar", title: "Avatar", orderable: false, "render": function (data) {
                return  str = `<img src="${data}" alt="avatar" width="30rem"/>`
                }
            },
            {
                data: "id", name: "ID", title: "ID", orderable: false
            },
            {
                data: "user_fullname", name: "Tên", title: "Tên", orderable: true
            },
            {
                data: "email", name: "Email", title: "Email", orderable: false
            },
            {
                data: "starting_date", name: "Ngày đăng ký", title: "Ngày đăng ký", orderable: true
            },
            {
                data: "role", name: "Role", title: "Role", orderable: false
            },
            {
                data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    var str = `<a href='/registers/user_detail/${data}' title='Xem chi tiết' style='color: orange'><i class="fas fa-eye"></i>
                        <a href='javascript:' title='Xóa User' onclick=users.delete(${data}) style='color: red'><i class="fas fa-trash-alt"></i></a>`
                    return str;
                }
            }
        ]
    });
};

users.addNew = function () {
    $('#modalTitle').html("Thêm User mới");
    users.resetForm();
    $('#modalAddEdit').modal('show');
}

users.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#name').val('');
    $("#formAddEdit").validate().resetForm();
    myInput.onkeyup();
}

users.save = function () {
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var userObj = {};
            userObj.email = $('#email').val();
            userObj.password = $('#password').val();
            userObj.role = $('#role').val();
            userObj.user_fullname = $('#user_fullname').val();
            userObj.user_phone = $('#user_phone').val();
            userObj.dob = $('#dob').val();
            userObj.user_address = $('#user_address').val();
            userObj.province = $('#province').val();
            userObj.user_gender = $('#user_gender').val();

            $.ajax({
                url: "http://localhost:8080/api/user/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userObj)
            }).done(function () {
                myInput.onkeyup();
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm thành công', 'INFORMATION:')
            }).fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('Thêm không thành công', 'INFORMATION:')

            });
        } else {
            var userObj = {};
            userObj.email = $('#email').val();
            userObj.password = $('#password').val();
            userObj.role = $('#role').val();
            userObj.user_fullname = $('#user_fullname').val();
            userObj.user_phone = $('#user_phone').val();
            userObj.dob = $('#dob').val();
            userObj.user_address = $('#user_address').val();
            userObj.province = $('#province').val();
            userObj.user_gender = $('#user_gender').val();
            userObj.id = $('#id').val();
            $.ajax({
                url: "http://localhost:8080/api/user/",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userObj)
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

users.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa user này không?",
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
                    url: "/api/user/" + id,
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

users.remove = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa user này không?",
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
                    url: "/registers/delete/" + id,
                    method: "DELETE",
                    dataType: "json"
                }).done(function () {
                    console.log("DELETE SUCCESS");
                    location.href ="/registers"
                    toastr.info('Xóa thành công!', 'INFORMATION:')
                }).fail(function () {
                    toastr.error('Xóa không thành công!', 'INFORMATION:')
                });
            }
        }
    })
}
users.initValidation = function () {
    $.validator.addMethod("PASSWORD",function(value,element){
            return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
        },"Mật khẩu phải ít nhất 8 ký tự, phải bao gồm chữ cái in hoa, in thường và số");
    $("#formAddEdit").validate({
        rules: {
            email: {
                required: true,
                maxlength: 60
            },
            password: {
                required: true,
                PASSWORD: true,
            },
            confirm_password: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            email: {
                required: "Vui lòng nhập Email",
                maxlength: 150
            },
            password: {
                required:"Vui lòng nhập Mật khẩu"
            },
            confirm_password: {
                required: "Vui lòng nhập xác nhận Mật khẩu",
                equalTo: "Không khớp với mật khẩu ở trên"
            }
        }
    });
}

users.initProvince = function () {
    $.ajax({
        url: "http://localhost:8080/api/province/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#provinces').empty();
            $.each(data, function (i, v) {
                $('#provinces').append(
                    "<option value='" + v.id + "'>" + v.name + "</option>"
                );
            });
        }
    });
};

users.initShop = function () {
    $.ajax({
        url: "http://localhost:8080/api/shop/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#shop').empty();
            $.each(data, function (i, v) {
                $('#shop').append(
                    `<option value='${v.id}'>${v.shop_name}</option>`
                );
            })
        }
    });
};

users.init = function () {
    users.intTable();
    users.initValidation();
    users.initProvince();
    users.initShop();
}

$(document).ready(function () {
    users.init();
});


var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
}

myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("validated");
    } else {
        letter.classList.remove("validated");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("validated");
    } else {
        capital.classList.remove("validated");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("validated");
    } else {
        number.classList.remove("validated");
        number.classList.add("invalid");
    }

    // Validate length
    if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("validated");
    } else {
        length.classList.remove("validated");
        length.classList.add("invalid");
    }
}
