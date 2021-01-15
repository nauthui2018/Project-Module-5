var userDetails = {} || userDetails;
var user = {};

function getUser() {
    var email = $('#userDetail').val();
    $.ajax({
        url: "/api/admin/user/find/" + email,
        method: "GET",
        dataType: "json",
        success: function (data) {
            user = data;
            if (user.shop != null) {
                $('#idShop').val(user.shop.id);
            }
            $('.username').html(data.user_fullname);
            $('#userId').val(data.id);
            $("#userAvatar").attr("src", data.user_avatar);
        }
    })
}

function toEmployeePage() {
    location.href = "/user/employees/" + user.shop.id + "/" + user.id;
}

function toEmployeeDetailPage() {
    location.href = "/user/employees/employeeDetail/" + user.id;
}

function toUserDetailPage() {
    location.href = "/admins/registers/user_detail/" + user.id;
}

function toShopDetailPage(){
    location.href = "/user/shops/" + user.shop.id;
}

function toEditShopPage(){
    if(user.role=="SHOP_OWNER"){
        location.href = "/user/shops/edit/" + user.shop.id+"/"+user.id;
    } else {
        toastr.error('Bạn không có quyền vào mục này!', 'INFORMATION:')
    }

}

$(document).ready(function () {
    var elems = document.getElementsByClassName("li-menu");
    var elems1 = document.getElementsByClassName("child_menu");
    for (i = 0; i < elems.length; i++) {
        elems[i].classList.remove("active");
    }
    for (i = 0; i < elems1.length; i++) {
        elems1[i].style.display = "none";
    }
    getUser();
    initProvince();
    initShop();
    infoUser()
})

function validatePass() {
    var oldPass = $('#passwordOld').val();
    var newPass = $('#passwordNew').val();
    var confirmPass = $('#passwordConfirm').val();

    if (oldPass == '') {
        toastr.error('Nhập mật khẩu cũ!', 'INFORMATION:')
        return false;
    } else if (oldPass.indexOf(' ') >= 0) {
        toastr.error('Mật khẩu không được chứa khoảng cách!', 'INFORMATION:')
        return false;
    } else if (newPass == '') {
        toastr.error('Nhập mật khẩu mới!', 'INFORMATION:')
        return false;
    } else if (newPass.indexOf(' ') >= 0) {
        toastr.error('Mật khẩu không được chứa khoảng cách!', 'INFORMATION:')
        return false;
    } else if (confirmPass == '') {
        toastr.error('Nhập xác nhận mật khẩu!', 'INFORMATION:')
        return false;
    } else if (confirmPass.indexOf(' ') >= 0) {
        toastr.error('Mật khẩu không được chứa khoảng cách!', 'INFORMATION:')
        return false;
    } else if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(newPass))){
        resetFormPass();
        $("#errormsg").html('Mật khẩu mới phải ít nhất 8 ký tự, phải bao gồm chữ cái in hoa, in thường và số!')
        $("#errormsg").show();
        return false
    }
    return true;
}

userDetails.changePassword = function () {
    if (validatePass()) {
        var oldPass = $('#passwordOld').val();
        var userOld = {};
        userOld.id = user.id;
        userOld.email = user.email;
        userOld.password = oldPass;
        var changePass = $.ajax({
            url: "/api/admin/user/checkpass",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(userOld)
        });
        changePass.done(function (data) {
            saveNewPass(data);
        });
        changePass.fail(function (xhr) {
            resetFormPass();
            if (xhr.status == 404)
                $("#errormsg").html('Mật khẩu cũ không đúng');
            $("#errormsg").show();
            return;
        });
    }
}

function saveNewPass(user) {
    var newPass = $('#passwordNew').val();
    var confirmPass = $('#passwordConfirm').val();
    if (newPass != confirmPass) {
        resetFormPass();
        $("#error").show();
        return
    } else {
        var userNew = {}
        userNew.id = user.id;
        userNew.password = newPass;
        userNew.email = user.email;
        var savePass = $.ajax({
            url: "/api/admin/user/changePass",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(userNew)
        });
        savePass.done(function (data) {
            resetFormPass();
            $("#succmsg").html('Đổi mật khẩu thành công!')
            $("#succmsg").show();
            return
        });
        savePass.fail(function (xhr) {
            resetFormPass();
            if (xhr == 404)
                $("#errormsg").html('Đổi mật khẩu không thành công!')
            $("#errormsg").show();
            return
        });
        return false;
    }
}

function resetFormPass() {
    $('#errormsg').hide();
    $('#error').hide();
    $('#passwordOld').val('');
    $('#passwordNew').val('');
    $('#passwordConfirm').val('');
}

var listProvince=[];
function initProvince() {
    $.ajax({
        url: "/api/admin/province/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listProvince=data;
            $('#province').empty();
            $('#province').append(`<option value="">Chọn tỉnh thành</option>`);
            $.each(data, function (i, v) {
                $('#province').append(
                    "<option value='" + v.id + "'>" + v.name + "</option>"
                );
            });
        }
    });
}

function findProvinceById(id){
    for(let i=0; i<listProvince.length; i++){
        if(listProvince[i].id==id)
            return listProvince[i];
    }
}

function initShop() {
    $.ajax({
        url: "/api/admin/shop/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#shop').empty();
            $('#shop').append(
                `<option value="">Chọn Cửa hàng</option>`
            );
            $.each(data, function (i, v) {

                $('#shop').append(
                    `<option value='${v.id}'>${v.shop_name}</option>`
                );
            })
        }
    });
}

function updateUser() {
    if(user.province!=null)
    $('#province').val(user.province.id);
    else $('#province').val('');
    $('#user_gender').val(user.user_gender);
    $('#info-user').hide();
    $('#update-user').show();
    $('#btn-update').hide();
    $('#btn-cancel').show();
    $('#btn-confirm').show()
    $('#btn-upload').show();
    $('#user_avatar').attr('src', $('#avatar-user').attr('src'));
}

function infoUser() {
    $('#info-user').show();
    $('#update-user').hide();
    $('#btn-update').show();
    $('#btn-cancel').hide();
    $('#btn-confirm').hide();
    $('#btn-upload').hide();
    $('#province-Update').hide();
}

function editUser(user) {
    if(user.province!=null){
        var provinceObj=findProvinceById(user.province.id);
        $('#province-Update').html(provinceObj.name).show();
        $('#province1').hide();
        $('#province2').hide();
    }
    $('#user_fullname-Update').html(user.user_fullname);
    $('#user_phone-Update').html(user.user_phone);
    $('#user_address-Update').html(user.user_address);
    $('#user_gender-Update').html(user.user_gender);
    $('#personal_code-Update').html(user.personal_code);

}

function confirmUpdate() {
    if ($("#formUpdateUser").valid()) {
        var userObj = {};
        userObj.id = $('#id').val();
        userObj.user_fullname = $('#user_fullname').val();
        userObj.user_phone = $('#user_phone').val();
        userObj.personal_code = $('#personal_code').val();
        userObj.user_gender = $('#user_gender').val();
        userObj.user_address = $('#user_address').val();
        var province = {};
        if($('#province').val()==''){
            province.id=0;
        } else province.id = $('#province').val();
        userObj.province = province;
        userObj.email = $('#email').val();
        userObj.role = user.role;
        var shop = {}
        if (user.role == 'ADMIN') {
            shop.id = 0;
        } else shop.id = user.shop.id;
        userObj.shop = shop;
        $.ajax({
            url: "/api/admin/user/",
            method: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(userObj)
        }).done(function (data) {
            user = data;
            uploadImage();
            infoUser();
            editUser(data);
            toastr.info('Sửa thông tin thành công', 'INFORMATION:')

        }).fail(function () {
            toastr.error('Không thành công', 'INFORMATION:')
        });
    }
}

function uploadImage(){
        var fd = new FormData();
        fd.append('file', $('#avatar')[0].files[0]);
        fd.append("id", $("#userId").val());
        $.ajax({
            url: "/api/admin/user/upload",
            type: "POST",
            data: fd,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
        }).done(function () {
            $('#userAvatar').attr('src', srcImage);
            $('#avatar-user').attr('src', srcImage);
        }).fail(function () {
            $('.modal').modal('hide');
            toastr.error('Không thêm ảnh', 'INFORMATION:')

        });
}

var srcImage;
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            srcImage=e.target.result;
            $('#user_avatar').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#avatar").change(function() {
    readURL(this);
});
