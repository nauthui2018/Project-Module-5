function showProductListDropdown() {
    document.getElementById("productDropdown").style.display = 'block';
}

function hideProductListDropdown() {
    setTimeout(() => {
        document.getElementById("productDropdown").style.display = 'none';
    }, 200);
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
            url: "/api/user/customer",
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

var pos = {} || pos;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function () {
    pos.init();
});

pos.init = function () {
    pos.initListProduct();
    customers.initValidation();
    customers.listCustomerGroup();
    customers.initListCustomer();
}

var number = $('.number');

number.onkeydown = function(e) {
    console.log(e.keyCode);
    if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        return false;
    }
}

customers.addNew = function () {
    $('.modal-title').html("Thêm khách hàng mới");
    customers.resetForm();
    $('#modalAddEdit').modal('show');
}

customers.resetForm = function () {
    $('#formAddEdit')[0].reset();
    $('#id').val('');
    $('#customerId').val('');
    $('#customer_fullName').val('');
    $('#customer_phone').val('');
    $('#customer_email').val('');
    $('#customer_address').val('');
    $('#gender').val('');
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
        url: "/api/user/customer_group",
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

var listCustomer = [];
customers.initListCustomer = function () {
    $.ajax({
        url: "/api/user/customer",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listCustomer = data;
            $.each(data, function (i, v) {
                $('#list-customer').append(
                    `<a href="javascript:" onclick="customers.getInfoCustomer(${v.id})">
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

customers.findCustomerById = function (id) {
    for (let i = 0; i < listCustomer.length; i++) {
        if (id == listCustomer[i].id) {
            return listCustomer[i];
        }
    }
    return null;
}

customers.getInfoCustomer = function (id) {
    var customerObj = customers.findCustomerById(id);
    $('#customerId').val(id);
    $('.customer-nameF').html(customerObj.customer_fullName);
    $('.customer-phone').html(customerObj.customer_phone);
}

var listProduct = [];

pos.initListProduct = function () {
    $.ajax({
        url: "/api/user/product",
        method: "GET",
        dataType: "json",
        success: function (data) {
            listProduct = data;
            $('#list-product').empty();
            $.each(data, function (i, v) {
                $('#list-product').append(
                    `<a href="javascript:" id="${v.id}" onClick="addToCart(${v.id})">
                        <div class="row">
                            <div class="col-2 grid">
                                <img src="${v.image}" alt="image" width="100%">
                            </div>
                            <div class="col-10 grid">
                                <div class="main-info">
                                    <div class="row">
                                        <div class="col-7 name-product">${v.name}</div>
                                        <div class="col-5 price-product">${numberWithCommas(v.current_price)+' đ'}</div>
                                    </div>
                                </div>
                                <div class="extra-info">
                                    <div class="row">
                                        <div class="col-7 code-product">${v.barcode}</div>
                                        <div class="col-5 canSale">
                                            Có thể bán: ${v.stock}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>`
                );
            });
        }
    });
}

pos.findProductById = function (id) {
    for (let i = 0; i < listProduct.length; i++) {
        if (id == listProduct[i].id) {
            return listProduct[i];
        }
    }
    return null;
}

var productArr = [];
addToCart = function (id) {
    var index = -1;
    var productItem = pos.findProductById(id);
    for (let i = 0; i < productArr.length; i++) {
        if (productArr[i].id === productItem.id) index = i;
    }
    if (index !== -1) {
        productArr[index].count++;
        productArr[index].amount = productArr[index].current_price * productArr[index].count;
        amountMoneyItem();
    } else {
        productItem.count = 1;
        productItem.amount = productItem.current_price * productItem.count;
        productArr.push(productItem);
        amountMoneyItem();
    }

    drawListProductItem(productArr);
}

drawListProductItem = function (productArr) {
    $('#list-item').empty();
    $.each(productArr, function (i, v) {
        $('#list-item').append(
            `<tr>
                <td>${i + 1}</td>
                <td><a href="javascript:" onclick="removeProduct(${v.id})"><i class="fas fa-trash-alt"></i></a></td>
                <td>${v.name}</td>
                <td><input type="number" class="text-right number" min="0" max="${v.stock}" step="1" id="quantity" value="${v.count}" 
                onchange="amountItem(${i},this.value,${v.current_price})" style="width: 100%;"></td>
                <td>${numberWithCommas(v.current_price)}</td>
                <td id="amount${i}">${numberWithCommas(v.amount)}</td>
            </tr>`
        );
    })
    const numberInput = document.getElementsByClassName('number');
    for (let i = 0; i < numberInput.length ; i++) {
        const numberInp = numberInput[i];
        numberInput[i].addEventListener("input",function (e) {
            numberInp.value = Math.abs(numberInp.value);
        })
    }
}

function amountItem(i, value, price) {

    productArr[i].count = value;

    productArr[i].amount = value * price;

    $('#amount' + i).html(numberWithCommas(productArr[i].amount));

    amountMoneyItem();

}

function parseToNumber(str) {
    return parseInt(str.replace(/,/g, "").replace(/-/g, ""));
}

function amountMoneyItem() {
    var amountMoney = 0;
    $.each(productArr, function (i, v) {
        amountMoney += v.amount;
    })
    $('#amountMoney').html(numberWithCommas(amountMoney));
    var strDiscount = $('#discount').val().replace(/,/g, "");
    var discount = parseInt(strDiscount.replace(/-/g, ""));
    var totalMoney = amountMoney - discount;
    $('#totalFinal').html(numberWithCommas(totalMoney));
}

function removeProduct(id) {
    var productItem = pos.findProductById(id);
    productArr = productArr.filter(item => item !== productItem);
    drawListProductItem(productArr);
    amountMoneyItem();
}

function formatCurrency(value) {
    $('#discount').val('-' + numberWithCommas(value));
}

function showInvoiceInfo() {
    if(productArr.length==0){
        return toastr.error('Không có gì để thanh toán','INFORMATION:')
    }

    var check = true;
    productArr.forEach(e => {
        var checkStock = e.stock - $('#quantity').val();
        if (checkStock < 0) {
            toastr.error(`Số lượng ${e.name} không đủ bán. Chỉ còn ${e.stock} `, 'INFORMATION:');
            check = false;
        }
    })

    if (check) {
        customers.resetForm();
        $('#invoice-info').modal('show');
        drawListInvoiceDetail();
        $('.discount-detail').html($('#discount').val());
        $('.total-detail').html($('#totalFinal').html() + ' đ');
    }
}

drawListInvoiceDetail = function () {
    $('#list-invoiceDetail').empty();
    var today = getToday();
    $('.invoiceDate').html(today);
    $.each(productArr, function (i, v) {
        $('#list-invoiceDetail').append(
            `<tr>
                <td>${i + 1}</td>
                <td>${v.name}</td>
                <td>${numberWithCommas(v.count)}</td>
                <td>${numberWithCommas(v.current_price)}</td>
                <td>${numberWithCommas(v.amount)}</td>
            </tr>`
        );
    })
}

drawListInvoiceDetailPrint = function () {
    $('#list-invoiceDetailPrint').empty();
    $.each(productArr, function (i, v) {
        $('#list-invoiceDetailPrint').append(
            `<tr>
                <td>${i + 1}</td>
                <td>${v.name}</td>
                <td>${numberWithCommas(v.count)}</td>
                <td>${numberWithCommas(v.current_price)}</td>
                <td>${numberWithCommas(v.amount)}</td>
            </tr>`
        );
    })
}

function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function printElement() {
    var idCustomer = $('#customerId').val();
    var checkShip = $('#isShip').is(":checked");
    if (checkShip && idCustomer == "") {
        return toastr.error('Nhập thông tin khách hàng cần Ship', 'INFORMATION:');
    }
    drawListInvoiceDetailPrint();
    $('#print-invoice').modal('show');
    var mode = 'iframe';
    var close = 'popup';
    var options = {mode: mode, popClose: close};
    $('div#print-invoice').printArea(options);
    setTimeout(() => {
        $('#print-invoice').modal('hide')
    }, 100);
    saveInvoice();

}


function saveInvoice() {
    var checkShip = $('#isShip').is(":checked");
    var user = {};
    user.id = $('#userId').val();
    var customer = {};
    var customerid = $('#customerId').val();
    if (customerid == "") {
        customer.id = 1
    } else customer.id = customerid;
    var invoice = {};
    invoice.user = user;
    invoice.customer = customer;
    invoice.discount = parseToNumber($('#discount').val());
    invoice.total_amount = parseToNumber($('#totalFinal').html());
    if (!checkShip) {
        invoice.finished = true;
    }
    var saveBill = $.ajax({
        url: "/api/user/invoice",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(invoice)
    });
    saveBill.done(function (data) {
        saveInvoiceDetail(data);
        setTimeout(pos.initListProduct(),100);
    });
    saveBill.fail(function () {
        toastr.error('Lưu hóa đơn không thành công', 'INFORMATION:');
    });
}

function saveInvoiceDetail(invoice) {
    var invoiceObj = {};
    invoiceObj.id = invoice.id;
    productArr.forEach(e => {
        var productObj = {};
        productObj.id = e.id;
        var invoiceDetail = {};
        invoiceDetail.product = productObj;
        invoiceDetail.quantity = e.count;
        invoiceDetail.retail_price = e.current_price;
        invoiceDetail.amount = e.amount;
        invoiceDetail.invoice = invoiceObj;
        var saveInvoiceDetail = $.ajax({
            url: "/api/user/invoiceDetail",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(invoiceDetail)
        });
        saveInvoiceDetail.done(function () {
            $('#invoice-info').modal('hide');
        });
        saveInvoiceDetail.fail(function () {
            return toastr.error('Lưu hóa đơn không thành công', 'INFORMATION:');
        });
    })
    clearData();
    return toastr.info('Lưu hóa đơn thành công', 'INFORMATION:');

}

function clearData() {
    productArr = [];
    $('.customer-nameF').html('');
    $('.customer-phone').html('');
    $('#list-item').empty();
    $('#amountMoney').html(0);
    $('#discount').val(0);
    $('#totalFinal').html(0);
    $('#customerId').val('');
    $('#isShip').prop('checked', false);
}



