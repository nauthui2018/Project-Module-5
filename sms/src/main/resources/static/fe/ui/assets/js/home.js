shops={}||shops;

$(document).ready(function () {
    $("#myModal").hide();
    $("#pos-login").hide();
    shops.initValidation();
});

shops.register = function () {
    if ($("#trialForm").valid()) {
        var shopObj = {};
        shopObj.shop_name = $('#shop_name').val();
        shopObj.email = $('#email').val();
        var province = {};
        province.id = $('#province').val();
        shopObj.province = province;
        var lob = {};
        lob.id = $('#lob').val();
        shopObj.lineOfBusiness = lob;
        var addShop = $.ajax({
            url: "/api/admin/shop",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(shopObj)
        });
        addShop.done(function (data) {
            $('#myModal').modal('hide');
            toastr.success('Thêm Shop thành công', 'INFORMATION:')
            setTimeout(() => {
                shops.addUser(data.id)
            }, 500);
        });
        addShop.fail(function (xhr) {
            if (xhr.status == 404) {
                toastr.error('Email này đã được sử dụng', 'INFORMATION:')
            } else {
                toastr.error('Thêm không thành công', 'INFORMATION:')
            }
        });

    }
}
shops.addUser = function (idShop) {
    var province = {};
    province.id = $('#province').val();
    var user = {};
    user.user_fullname=$('#user_fullname').val();
    user.user_phone=$('#user_phone').val();
    user.email = $('#email').val();
    user.password=$('#password').val();
    user.role = 'SHOP_OWNER';
    user.province = province;
    var shop = {}
    shop.id = idShop;
    user.shop = shop;
    var addUser = $.ajax({
        url: "/api/admin/user/",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(user)
    });
    addUser.done(function () {
        shops.resetForm();
    });
    addUser.fail(function (xhr) {
        if (xhr.status = 404) {
            toastr.error('Email này đã được sử dụng', 'INFORMATION:')
        }
    });
}
shops.initValidation = function () {
    $.validator.addMethod("PASSWORD", function (value, element) {
        return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
    }, "Mật khẩu phải ít nhất 8 ký tự, phải bao gồm chữ cái in hoa, in thường và số");
    $("#trialForm").validate({
        rules: {
            user_fullname:{
                required:true,
            },
            shop_name: {
                required: true,
                maxlength: 20
            },
            user_phone: {
                required: true,
                maxlength: 17,
                minlength: 10
            },
            email: {
                required: true,
                maxlength: 60
            },
            province: {
                required: true,
            },
            lob: {
                required: true,
            },
            password : {
                required: true,
                PASSWORD: true,
            }
        },
        messages: {
            user_fullname:{
                required:"Vui lòng nhập tên Chủ Shop",
            },
            shop_name: {
                required: "Vui lòng nhập tên Shop",
                maxlength: "Không quá 20 ký tự"
            },
            user_phone: {
                required: "Vui lòng nhập Số điện thoại",
                maxlength: "Nhập từ 10 đến 17 ký tự",
                minlength: "Nhập từ 10 đến 17 ký tự"
            },
            email: {
                required: "Vui lòng nhập Email",
                maxlength: "Không quá 60 ký tự"
            },
            province: {
                required: "Vui lòng chọn tỉnh thành",
            },
            lob: {
                required: "Vui lòng chọn mặt hàng kinh doanh",
            },
            password : {
                required: "Vui lòng nhập Mật khẩu",
            }
        }
    });
}
shops.resetForm = function () {
    $('#trialForm')[0].reset();
    $('#shop_name').val('');
    $('#user_fullname').val('');
    $('#user_phone').val('');
    $('#email').val('');
    $('#password').val('');
    $('#address').val('');
    $('#province').val('');
    $('#lob').val('');
    $("#trialForm").validate().resetForm();
}
