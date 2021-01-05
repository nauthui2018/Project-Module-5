function showProductListDropdown() {
    document.getElementById("productDropdown").style.display = 'block';
}

function hideProductListDropdown() {
    setTimeout(() => {
        document.getElementById("productDropdown").style.display = 'none';
    }, 100);
}

function filterProductFunction() {
    var input, filter, a, i;
    input = document.getElementById("productList");
    filter = input.value.toUpperCase();
    div = document.getElementById("productDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function showCustomerListDropdown() {
    document.getElementById("customerDropdown").style.display = 'block';
}

function hideCustomerListDropdown() {
    setTimeout(() => {
        document.getElementById("customerDropdown").style.display = 'none';
    }, 100);
}

function filterCustomerFunction() {
    var input, filter, a, i;
    input = document.getElementById("customerList");
    filter = input.value.toUpperCase();
    div = document.getElementById("customerDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

var customers = {} || customers;
var listCustomerGroup = [];

customers.save = function () {
    if ($("#formAddEdit").valid()) {
        var customer = {};
        customer.customer_fullName = $('#customer_fullName').val();
        var customer_groups = {};
        customer_groups.id = $('#customer_group').val();
        customer.customer_group = customer_groups;
        customer.customer_phone = $('#customer_phone').val();
        customer.customer_email = $('#customer_email').val();
        customer.customer_address = $('#customer_address').val();
        customer.gender = $('#gender').val();
        customer.deleted = $('#deleted').val();
        var ajaxAdd = $.ajax({
            url: "/api/customer",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(customer)
        });
        ajaxAdd.done(function () {
            $('#modalAddEdit').modal('hide');
            $('#list-customer').empty();
            customers.initListCustomer();
            toastr.info('Thêm thành công', 'INFORMATION:');
        });
        ajaxAdd.fail(function () {
            $('#modalAddEdit').modal('hide');
            customers.initListCustomer();
            toastr.error('Thêm không thành công', 'INFORMATION:');
        });
        return false;
    }
}

$(document).ready(function () {
    customers.init();
});

customers.init = function () {
    customers.initValidation();
    customers.listCustomerGroup();
    customers.initListCustomer();
}

customers.addNew = function () {
    $('.modal-title').html("Thêm khách hàng mới");
    customers.resetForm();
    $('#modalAddEdit').modal('show');
}

customers.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#customer_fullName').val('');
    $('#customer_phone').val('');
    $('#customer_email').val('');
    $('#customer_address').val('');
    $('#gender').val('');
    $('#deleted').val('');
    $('#customer_group').val(0);
    $("#formAddEdit").validate().resetForm();
}

customers.initValidation = function () {
    $("#formAddEdit").validate({
        rules: {
            customer_fullName: {
                required: true,
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

customers.listCustomerGroup = function () {
    $.ajax({
        url: "/api/customer_group",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listCustomerGroup = data;
            $.each(data, function (i, v) {
                $('#customer_group').append(
                    `<option value='${v.id}'>${v.name}</option>`
                );
            });
        }
    });
}

customers.initListCustomer = function () {
    $.ajax({
        url: "/api/customer",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#list-customer').append(
                    `<a href="#">
                       <div class="grid-customer">
                         <div class="main-info">${v.customer_fullName}</div>
                         <div class="extra-info">${v.customer_phone}</div>
                       </div>
                    </a>`
                );
            });
        }
    });
}


