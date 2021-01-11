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
})

function getUser() {
    var email=$('#userDetail').val();
    $.ajax({
        url: "/api/admin/user/find/"+email,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('.username').html(data.user_fullname);
            $('#userId').val(data.id);
            $("#userAvatar").attr("src",data.user_avatar);
        }
    })
}

