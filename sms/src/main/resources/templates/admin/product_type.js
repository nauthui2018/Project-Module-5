var product_type = {} || product_type;
product_type.drawTable = function () {
    $("#dataTable").DataTable({
        "lengthMenu": [5, 10, 20, 50],
        ajax: {
            url: 'http://localhost:8080/api/product_type',
            method: "GET",
            datatype: "json",
            dataSrc: ""
        },
        columns: [
            { data: "id" , name: "id", title: "ID",orderable: true},
            { data: "name", name : "name" , title: "Name", sortable: true},
            { data: "creatingDate", name : "creatingDate" , title: "Creating Date", sortable: true},
            { data: "wholesale_quantity", name : "wholesale_quantity" , title: "Wholesale Quantity", sortable: true},
            { data: "id", name : "Action", title : "Action",sortable: false,
                orderable: false ,"render": function ( data, type, row, meta ) {
                    var str = "<a href='javascript:;' title='Edit' onclick='product_type.get("+ data +")' data-toggle=\"modal\" data-target=\"#myModal\" style=\"color: darkorange\">" +
                        "<i class='fa fa-edit mr-1'></i>Edit</a> " +
                        "<a class='ml-1' href='javascript:;' title='Remove' onclick='product_type.remove("+ data +")'  style=\"color: red\">" +
                        "<i class='fa fa-trash mr-1'></i>Delete</a>"
                    return str ;
                }
            }
        ]
    });
};

product_type.remove = function (id) {
    bootbox.confirm({
        message: "Do you want to delete this blog?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:8080/api/product_type/" + id,
                    method: "DELETE", //"POST"
                    dataType: 'json',
                    success: function (data) {
                        product_type.reloadTable();
                        toastr.warning('A product type has been deleted successfully', 'INFORMATION:')
                    }
                });
            }
        }
    });
}

product_type.create = function () {
    if ($('#myForm').valid()) {
        var newProductType = {};
        newProductType.name = $('#name').val();
        newProductType.creatingDate = $('#creatingDate').val();
        newProductType.wholesale_quantity = $('#wholesale_quantity').val();
        newProductType.deleted = false;
        if($('#id').val() === '') { //Add new
            $.ajax({
                url: "http://localhost:8080/api/product_type",
                method: "POST", //"POST"
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(newProductType),
                success: function (data) {
                    $('#myModal').modal('hide');
                    product_type.reloadTable();
                    toastr.success('New type has been created successfully', 'INFORMATION:');
                }
            })
        } else {
            newProductType.id = $('#id').val();
            $.ajax({
                url: "http://localhost:8080/api/product_type",
                method: "PUT",
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(newProductType),
                success: function (data) {
                    $('#myModal').modal('hide');
                    product_type.reloadTable();
                    toastr.success('Product type has been updated successfully', 'INFORMATION:');
                }
            });
        }
    }
    product_type.reset();
    return false;
}

product_type.get = function (id) {
    $.ajax({
        url: `http://localhost:8080/api/product_type/${id}`,
        method: "GET",
        dateType: "json",
        success: function (data) {
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#creatingDate').val(data.creatingDate);
            $('#wholesale_quantity').val(data.wholesale_quantity);
            $('#deleted').val(data.deleted);
            $('#myModal').find('.modal-title').text('Update tag');
            $('#submit').text("Update");
        }
    })
}

product_type.reset = function () {
    $('#name').val('');
    $('#creatingDate').val('');
    $('#wholesale_quantity').val('');
    $('#myModal').find('.modal-title').text('Create new product type');
    $('#submit').text("Save");
}

product_type.reloadTable = function () {
    $("#dataTable").DataTable().ajax.reload();
}

$(document).ready(function () {
    product_type.drawTable();
    $('#myForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 5,
                maxlength: 30,
            },
        },
        messages: {
            name: "Please input name!!!",
        }
    });
});

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);