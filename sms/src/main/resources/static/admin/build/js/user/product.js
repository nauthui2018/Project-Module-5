let products = {} || products;
var listProduct = [];

products.init = function () {
    products.intTable();
    products.initValidation();
    product_types.listProductType();
}

products.addNew = function () {
    $('#imageSrc').attr('src','/admin/images/default/default-image.jpg');
    $('.modal-title').html("Thêm sản phẩm mới");
    products.resetForm();
    $('#modalAddEdit').modal({
        backdrop: 'static'
    });
}

products.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#name').val('');
    $('#product_type').val(0);
    $('#current_price').val('');
    $('#current_prime_cost').val('');
    $('#brand').val('');
    $('#stock').val('');
    $('#unit').val('');
    $('#barcode').val('');
    $('#description').val('');
    $("#formAddEdit").validate().resetForm();
}

products.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 150,
            },
        },
        messages: {
            name: {
                required: "Bạn chưa nhập tên",
                minlength: "Tên sản phẩm quá ngắn",
                maxlength: "Tên quá dài. Bạn vui lòng kiểm tra lại!",
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

products.intTable = function () {
    $("#datatables").DataTable({
        ajax: {
            url: '/api/user/product/',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "name", name: "name", title: "Tên sản phẩm", orderable: true},
            // { data: "image", name: "image", title: "Hình ảnh", orderable: false,
            //     "render": function (data) {
            //         return `<img src="${data}" id="imageSrc" alt="image" style="width: 40px; height:40px; object-fit:cover;">`;
            //     }
            // },
            { data: "brand", name: "Nhãn hiệu", title: "Nhãn hiệu", orderable: true},
            { data: "stock", name: "stock", title: "Tồn kho", orderable: true},
            { data: "id", name: "Action", title: "Thao tác", sortable: false,
                orderable: false, "render": function (data) {
                    return `<a href='javascript:' title='Cập nhật' onclick='products.get(${data})' data-toggle="modal" data-target="#modalAddEdit" style='color: orange'><i class="fas fa-edit"></i></a>
                        <a class='ml-3' href='javascript:' title='Xóa' onclick='products.delete(${data})' style='color: red'><i class="fas fa-trash-alt"></i></a>`;
                }
            }
        ]
    });
};

products.get = function (id) {
    var ajaxGet = $.ajax({
        url: "/api/user/product/" + id,
        method: "GET",
        dataType: "json"
    });
    ajaxGet.done(function (data) {
        $('#formAddEdit')[0].reset();
        $('.modal-title').html("Chỉnh sửa thông tin sản phẩm");
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#brand').val(data.brand);
        $('#imageSrc').attr('src',data.image);
        $('#stock').val(data.stock);
        $('#current_price').val(data.current_price);
        $('#current_prime_cost').val(data.current_prime_cost);
        $('#unit').val(data.unit);
        $('#barcode').val(data.barcode);
        $('#description').val(data.description);
        $('#product_type').val(data.product_type.id);
        $('#modalAddEdit').modal({
            backdrop: 'static'
        });
    });
    ajaxGet.fail(function () {
        toastr.error('Lấy dữ liệu bị lỗi', 'INFORMATION:')
    });
}

products.save = function () {
    if ($("#formAddEdit").valid()) {
        var product = {};
        product.id = $('#id').val();
        product.name = $('#name').val();
        var product_type = {};
        var product_type_id = parseInt($('#product_type').val());
        product_type.id = product_type_id;
        product.product_type = product_type;
        product.current_price = $('#current_price').val();
        product.current_prime_cost = $('#current_prime_cost').val();
        product.brand = $('#brand').val();
        product.stock = $('#stock').val();
        product.unit = $('#unit').val();
        product.barcode = $('#barcode').val();
        product.description = $('#description').val();
        product.creating_date = null;
        if ($('#id').val() === '') {
            var ajaxAdd = $.ajax({
                url: "/api/user/product",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product)
            });
            ajaxAdd.done(function (data) {
                $('#product_id').val(data.id);
                setTimeout(() => {
                    products.uploadImage();
                }, 500);
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Thêm sản phẩm thành công', 'INFORMATION:');
            });
            ajaxAdd.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('LỖI! Thêm không thành công', 'INFORMATION:');
            });
        } else {
            var ajaxUpdate = $.ajax({
                url: "/api/user/product",
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(product)
            });
            ajaxUpdate.done(function () {
                products.uploadImage();
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.info('Cập nhật thông tin thành công', 'INFORMATION:')
            });
            ajaxUpdate.fail(function () {
                $('#modalAddEdit').modal('hide');
                $("#datatables").DataTable().ajax.reload();
                toastr.error('LỖI!. Cập nhật không thành công', 'INFORMATION:')

            });
        }
        return false;
    }
}

products.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có muốn xóa sản phẩm này không?",
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
                    url: "/api/user/product/" + id,
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

products.listProduct = function () {
    $.ajax({
        url: "/api/user/product",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listProduct = data;
            $.each(data, function (i, v) {
                $('#product').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
            $.each(data, function (i, v) {
                $('#new_product').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

products.findById = function (id) {
    for (let i = 0; i < listProduct.length; i++) {
        if (id === listProduct[i].id) {
            return listProduct[i];
        }
    }
    return null;
}

products.uploadImage= function (){
    var fd = new FormData();
    fd.append( 'file', $('#image')[0].files[0]);
    fd.append("id",$("#product_id").val());
    $.ajax({
        url: "/api/user/product/upload",
        type: "POST",
        data: fd,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
    }).done(function (){
        $('#imageSrc').attr('src', srcImage);
    }).fail(function () {
        $('.modal').modal('hide');
        toastr.error('Thêm ảnh không thành công', 'INFORMATION:')

    });
}

var srcImage;
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            srcImage=e.target.result;
            $('#imageSrc').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#image").change(function() {
    readURL(this);
});


