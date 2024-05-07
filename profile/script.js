import * as JS from '../main/mainJS.js';


// Lấy giá trị của biến username từ query parameters
var queryParams = new URLSearchParams(window.location.search);
var username = atob(queryParams.get('username'));
var view = atob(queryParams.get('view'));


//
//
// SỰ KIỆN
//
//

//SK: Tải trang
document.addEventListener('DOMContentLoaded', function() {
    loadInformation(username);
    behaviorManagement();
})


//SK: Click nút reset
document.getElementById("reset").addEventListener('click', function() {
    loadInformation(username);
})

//SK: Click nút Vô hiệu hóa
document.getElementById("deactivate_account_btn").addEventListener('click', function() {
    deactivate(username);
})


//
//
// Hàm hoạt động
//
//

//Quản lí hành vi
function behaviorManagement() {
    if(view !== "admin") {
        document.getElementById("infor_name").setAttribute('readonly', 'readonly');
        document.getElementById("infor_phone").setAttribute('readonly', 'readonly');
        document.getElementById("infor_email").setAttribute('readonly', 'readonly');
        document.getElementById("infor_date").setAttribute('readonly', 'readonly');
        document.getElementById("infor_month").setAttribute('readonly', 'readonly');
        document.getElementById("infor_year").setAttribute('readonly', 'readonly');
        
        document.getElementById("male").disabled = true;
        document.getElementById("female").disabled = true;
        document.getElementById("other").disabled = true;
        
        var managerElements = document.querySelectorAll(".manager");
        managerElements.forEach(function(element) {
            element.style.display = "none";
        });
    }
}


//Cập nhật thông tin các trường theo database
function loadInformation(username) {
    var path = "../profile/information.php";
    var data = "username=" + encodeURIComponent(username) + "&process=loadInformation"
    JS.connectToPHP(path, data, function(xhr){
        var response = JSON.parse(xhr.responseText);

        document.getElementById("infor_name").value = response.fullname.substring(response.fullname.lastIndexOf(" ")+1);
        document.getElementById("infor_surname").value = response.fullname.substring(0, response.fullname.lastIndexOf(" "));
        document.getElementById("infor_phone").value = response.phone;
        document.getElementById("infor_email").value = response.email;
        document.getElementById("infor_date").value = response.dateBirth.slice(9,10);
        document.getElementById("infor_month").value = response.dateBirth.slice(6,7);
        document.getElementById("infor_year").value = response.dateBirth.slice(0,4);
        
        //Avatar
        username = response.email.split('@')[0];
        document.getElementById("infor_avatar").src = "../avatar/" + username + ".png"


        // Giới tính
        var genders = document.querySelectorAll('input[name="gender"]');
        genders.forEach(function(gender) {
            if(gender.value === response.gender) {
                gender.checked = true;
            }
        });

        //Trạng thái tài khoản
        if(response.roled === 1) {
            document.getElementById("deactivate_account_btn").textContent = "Vô hiệu khóa tài khoản";
        }
        if(response.roled === -1) {
            document.getElementById("deactivate_account_btn").textContent = "Kích hoạt lại tài khoản";
        }

        document.getElementById("change_pwb").style.display = "none";
    })
}

function deactivate(username) {
    var actived = 1;
    if(document.getElementById("deactivate_account_btn").textContent.trim() === "Vô hiệu hóa tài khoản") {
        actived = -1;
    }
    var path = "../profile/information.php";
    var data =  "username=" + username + 
                "&actived=" +  actived +
                "&process=deactivate"
    JS.connectToPHP(path, data, function(xhr) {
        alert(xhr.responseText);
    })
}