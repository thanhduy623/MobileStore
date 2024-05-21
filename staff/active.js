import * as JS from '../main/mainJS.js';

document.addEventListener('DOMContentLoaded', function() {
    var queryParams = new URLSearchParams(window.location.search);
    var username = atob(queryParams.get('username'));
    var expires = atob(queryParams.get('expires'));
    var now = Math.floor(Date.now() / 1000);

    if (!queryParams.has('expires')) {
        return
    }

    if(expires < now) {
        document.getElementById("text").innerHTML = "VUI LÒNG LIÊN HỆ QUẢN TRỊ VIÊN";
        document.querySelectorAll('.del').forEach(function(x) {
            x.remove();
        });
        return
    }

    var data =  "process=active0" +
                "&username=" + username 
    JS.connectToPHP("active.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        alert(response[1])
    })
});


document.getElementById("btnSubmit").addEventListener('click', function() {
    var MK1 = document.getElementById("MK1");
    var MK2 = document.getElementById("MK2");
    
    if(MK1.value.length == 0) {
        alert("Vui lòng nhập mật khẩu mới");
        MK1.focus();
        return;
    }

    if(MK2.value.length == 0) {
        alert("Vui lòng nhập lại mật khẩu");
        MK2.focus();
        return;
    }

    if(MK1.value != MK2.value) {
        alert("Xác nhận mật khẩu không trùng khớp");
        MK1.focus();
        return;
    }

    var queryParams = new URLSearchParams(window.location.search);
    var data =  "process=active1" +
                "&username=" + atob(queryParams.get('username')) +
                "&pwd=" + MK1.value
    JS.connectToPHP("active.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        //Thất bại
        if(!response[0]) {
            alert(response[1]);
            // return;
        }

        if(response[0]) {
            alert(response[1])
            window.location.href = '../index.html';
            return
        }
    })
})

