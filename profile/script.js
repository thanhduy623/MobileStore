import * as JS from '../main/mainJS.js';
// Lấy giá trị của biến username từ query parameters
var queryParams = new URLSearchParams(window.location.search);
var username = atob(queryParams.get('username'));
var view = atob(queryParams.get('view'));


//SK: Tải trang
document.addEventListener('DOMContentLoaded', function() {
    loadInformation(username);
    behaviorManagement(username);
})


//SK: Click nút reset
document.getElementById("reset").addEventListener('click', function() {
    loadInformation(username);
})

//SK: Click nút Vô hiệu hóa
document.getElementById("deactivate_account_btn").addEventListener('click', function() {
    deactivate(username);
})


//SK: Chuyển đổi phân quyền
document.getElementById("change_role_select").addEventListener('change', function() {
    changeRoled(username);
})


//SK: Xóa tài khoản
document.getElementById("delete_account_btn").addEventListener('click', function() {
    deleteAccount(username);
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
    var path = "../profile/inforStaff.php";
    var data = "username=" + encodeURIComponent(username) + "&process=loadInformation"
    JS.connectToPHP(path, data, function(xhr){
        var response = JSON.parse(xhr.responseText);

        document.getElementById("infor_name").value = response.fullname.substring(response.fullname.lastIndexOf(" ") + 1);
        document.getElementById("infor_surname").value = response.fullname.substring(0, response.fullname.lastIndexOf(" "));
        document.getElementById("infor_phone").value = response.phone;
        document.getElementById("infor_email").value = response.email;
        document.getElementById("infor_date").value = response.dateBirth.slice(9,10);
        document.getElementById("infor_month").value = response.dateBirth.slice(6,7);
        document.getElementById("infor_year").value = response.dateBirth.slice(0,4);
        document.getElementById("change_role_select").value = response.roled;
        
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
        if(response.actived == 1) {
            document.querySelector("#deactivate_account_btn button").textContent = "Vô hiệu khóa tài khoản";
        }
        if(response.actived == -1) {
            document.querySelector("#deactivate_account_btn button").textContent = "Kích hoạt lại tài khoản";
        }

        document.getElementById("change_pwb").style.display = "none";
    })
}


//Vô hiệu khóa tài khoản
function deactivate(username) {
    var actived = 1;
    if(document.getElementById("deactivate_account_btn").textContent.trim() === "Vô hiệu hóa tài khoản") {
        actived = -1;
    }
        
    var path = "../profile/inforStaff.php";
    var data =  "username=" + username + 
                "&actived=" +  actived +
                "&process=deactivate"
    JS.connectToPHP(path, data, function(xhr) {
        if(actived == 1) {
            alert("Đã kích hoại lại tài khoản thành công");
            document.querySelector("#deactivate_account_btn button").textContent = "Vô hiệu hóa tài khoản";
        } else {
            alert("Đã vô hiệu hóa tài khoản thành công");
            document.querySelector("#deactivate_account_btn button").textContent = "Kích hoạt lại tài khoản";
        };
    })
}


//Thay đổi ảnh đại diện
document.getElementById("change_avatar").addEventListener('click', function(){
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png';
    
    // Khi người dùng chọn file ảnh
    input.addEventListener('change', function() {
        var file = this.files[0];

        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() 
            {
                var imageData = reader.result;
                var path = "../staff/uploadAvatar.php";
                var data = 'email=' + encodeURIComponent(document.getElementById("infor_email").value) +
                           '&image=' + encodeURIComponent(imageData);
                JS.connectToPHP(path, data, function(xhr) {
                    //Cập nhật ảnh mới
                    document.getElementById("infor_avatar").src = xhr.responseText;
                });
            };
        }
    });

    input.click();
})

//SK: Bấm nút lưu
document.getElementById("save").addEventListener('click', function() {
    var fname = document.getElementById("infor_name");
    var lname = document.getElementById("infor_surname");
    var phone = document.getElementById("infor_phone");
    var email = document.getElementById("infor_email");
    var dd = document.getElementById("infor_date");
    var mm = document.getElementById("infor_month");
    var yy = document.getElementById("infor_year");
    var gender = JS.getRadio('gender');
    var avatar = document.getElementById("infor_avatar")
    
    //Kiểm tra dữ liệu đầu vào
    if(!checkInput(fname, lname, phone, dd, mm, yy)) {return;}
    var path =  "../profile/inforStaff.php";
    var data =  "username=" + email.value.substring(0, email.value.indexOf("@")) +
                "&fullname=" + lname.value +" "+ fname.value + 
                "&gender=" + gender.value +
                "&dateBirth=" + yy.value +"/"+ mm.value +"/"+ dd.value +
                "&phone=" + phone.value +
                "&avatar=" + avatar.src +
                "&process=updateInformation"

    JS.connectToPHP(path, data, function(xhr) {
        alert(xhr.response);
    })
})

function checkInput(fname, lname, phone, dd, mm, yy) {
    if(JS.checkEmpty(lname)) {
        alert("Vui lòng nhập họ của nhân viên");
        lname.focus();
        return false;
    }

    if(JS.checkEmpty(fname)) {
        alert("Vui lòng nhập tên của nhân viên");
        fname.focus();
        return false;
    }

    if(JS.checkEmpty(phone)) {
        alert("Vui lòng nhập số điện thoại của nhân viên");
        phone.focus();
        return false;
    }


    if(!(JS.checkPhone(phone))) {
        alert("Vui lòng nhập đúng định dạng số điện thoại");
        phone.focus();
        return false;
    }

    if(!JS.getRadio('gender')) {
        alert("Vui lòng chọn giới tính của nhân viên");
        gender.focus();
        return false;
    } 

    if(JS.checkDate(dd, mm, yy)) {
        alert("Vui lòng chọn ngày sinh của nhân viên");
        dd.focus();
        return false;
    }

    return true;
}


function changeRoled(username) {
    var roled = document.getElementById("change_role_select").value;

    var path =  "../profile/inforStaff.php";
    var data =  "username=" + username +
                "&roled=" + roled + 
                "&process=changeRoled";
    
    JS.connectToPHP(path, data, function(xhr) {
        alert(xhr.response);
        // document.getElementById("change_role_select").textContent = roled;
    })
}


function deleteAccount(username) {
    alert("Chức năng đang trong quá trình phát triển");
}