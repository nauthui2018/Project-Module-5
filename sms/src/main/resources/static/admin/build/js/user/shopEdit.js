var shops = {} || shops;
var srcLogoDefault;
var user = {};

function getUserLogin() {
    var email = $('#userDetail').val();
    $.ajax({
        url: "/api/admin/user/find/" + email,
        method: "GET",
        dataType: "json",
        success: function (data) {
            user = data;
            srcLogoDefault=$('#logo_shop').attr('src',user.shop.logo);
        }
    })
}

shops.save = function () {
    if ($("#formUpdateShop").valid()) {
        var shopObj = {};
        shopObj.shop_name = $('#shop_name').val();
        shopObj.email = $('#email').val();
        shopObj.phone = $('#phone').val();
        shopObj.address = $('#address').val();
        var province = {};
        province.id = $('#province').val();
        shopObj.province = province;
        var lob = {};
        lob.id = $('#lob').val();
        shopObj.lineOfBusiness = lob;
        shopObj.id = $('#id').val();
        $.ajax({
            url: "/api/admin/shop/",
            method: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(shopObj)
        }).done(function (data) {
            user.shop=data;
            shops.uploadImage();
            toastr.info('Cập nhật thành công', 'INFORMATION:')
        }).fail(function () {
            toastr.error('Cập nhật không thành công', 'INFORMATION:')
        });
        return false;
    }
}

shops.initProvince = function () {
    $.ajax({
        url: "/api/admin/province/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#province').empty();
            $('#province').append(`<option value="">Chọn tỉnh thành</option>`);
            $.each(data, function (i, v) {
                $('#province').append(
                    "<option value='" + v.id + "'>" + v.name + "</option>"
                );
            });
            getUserLogin();
            $('#province').val(user.shop.province.id);
        }
    });
};

shops.initLineOfBusiness = function () {
    $.ajax({
        url: "/api/admin/lob/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#lob').empty();
            $('#lob').append(`<option value="">Chọn mặt hàng kinh doanh</option>`);
            $.each(data, function (i, v) {
                $('#lob').append(
                    "<option value='" + v.id + "'>" + v.name + "</option>"
                );
            });
            getUserLogin();
            $('#lob').val(user.shop.lineOfBusiness.id);
        }
    });
};

shops.initValidation = function () {
    $("#formUpdateShop").validate({
        rules: {
            shop_name: {
                required: true,
                maxlength: 20
            },
            phone: {
                required: true,
                maxlength: 17,
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
            province: {
                required: true,
            },
            lineOfBusiness: {
                required: true,
            },
        },
        messages: {
            shop_name: {
                required: "Vui lòng nhập tên Cửa hàng",
                maxlength: "Không quá 20 ký tự"
            },
            phone: {
                required: "Vui lòng nhập Số điện thoại",
                maxlength: "Nhập từ 10 đến 17 ký tự",
                minlength: "Nhập từ 10 đến 17 ký tự"
            },
            email: {
                required: "Vui lòng nhập Email",
                maxlength: "Không quá 60 ký tự"
            },
            address: {
                required: "Vui lòng nhập Địa chỉ",
                maxlength: "Nhập từ 5 đến 60 ký tự",
                minlength: "Nhập từ 5 đến 60 ký tự"
            },
            province: {
                required: "Vui lòng chọn tỉnh thành",
            },
            lineOfBusiness: {
                required: "Vui lòng chọn mặt hàng kinh doanh",
            },
        }
    });
}

shops.resetDefault=function (){
    $('#shop_name').val((user.shop.shop_name));
    $('#phone').val(user.shop.phone);
    $('#address').val(user.shop.address);
    $('#email').val(user.shop.email);
    $('#province').val(user.shop.province.id);
    $('#lob').val(user.shop.lineOfBusiness.id);
    $('#logo_shop').attr('src',srcLogoDefault);

}

shops.uploadImage=function (){
    var fd = new FormData();
    fd.append('file', $('#logoShop')[0].files[0]);
    fd.append("id", $("#id").val());
    $.ajax({
        url: "/api/admin/shop/upload",
        type: "POST",
        data: fd,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
    }).done(function () {
        $('#logo_shop').attr('src', srcImage);
        srcLogoDefault=srcImage;
    }).fail(function () {
        $('.modal').modal('hide');
        toastr.error('Không thêm ảnh', 'INFORMATION:')

    });
}

var srcImage;
shops.readURL=function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            srcImage=e.target.result;
            $('#logo_shop').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#logoShop").change(function() {
    shops.readURL(this);
});

shops.init = function () {
    getUserLogin();
    shops.initValidation();
    shops.initProvince();
    shops.initLineOfBusiness();
    shops.resetDefault();
}

$(document).ready(function () {
    shops.init();
});
