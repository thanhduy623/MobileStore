import * as JS from '../main/mainJS.js';
document.addEventListener('DOMContentLoaded', function() {
    JS.checkSession(function() {});
})


document.addEventListener('DOMContentLoaded', loadCustomer)

document.getElementById("find").addEventListener('input', find)

function loadCustomer() {
    JS.connectToPHP("../CustomerManagement/CustomerManagement.php","process=loadCus", function(xhr) {
        var response = JSON.parse(xhr.responseText);

        if(!response[0]) {alert(response[1]); return}

        var container = document.getElementById('customer_main_content');
        for (var i = 0; i < response.length; i++) {
            var cus = response[i];

            var userBox = document.createElement('div');
            userBox.className = 'user_box';
    
            // Tạo các phần tử p cho thông tin người dùng
            var sdt = document.createElement('p');
            sdt.className = 'c_u_sdt'; // Sửa lại tên biến
            sdt.id = 'c_u_sdt'; // Sửa lại tên biến
            sdt.textContent = cus.phone;
    
            var hoTen = document.createElement('p');
            hoTen.id = 'c_u_ho_ten';
            hoTen.textContent = cus.fullName;
    
            var diaChi = document.createElement('p');
            diaChi.id = 'c_u_dia_chi';
            diaChi.textContent = cus.address;
    
            // Thêm các phần tử p vào userBox
            userBox.appendChild(sdt);
            userBox.appendChild(hoTen);
            userBox.appendChild(diaChi);
    
            // Thêm userBox vào container
            container.appendChild(userBox);
        }
    })
}

function find() {
    var sdt = document.getElementById("find").value;

    var userBoxes = document.querySelectorAll('.user_box');
            
    userBoxes.forEach(function(userBox) {
        var sdtElement = userBox.querySelector('.c_u_sdt');
        if (sdt === "" || (sdtElement && sdtElement.textContent.includes(sdt))) {
            userBox.style.display = 'flex'; // Hiển thị userBox
        } else {
            userBox.style.display = 'none'; // Ẩn userBox
        }
    });
}





// Delete Account Confirmation
function deleteAccountConfirmation(){
    var delete_account_btn = document.querySelectorAll('.delete_account_btn');
    var delete_account_confirmation_modal = document.getElementById('delete_account_confirmation_modal');
    var cancel_delete_account = document.getElementById('cancel_delete_account');
    delete_account_btn.forEach(btn => {
        btn.addEventListener('click', function(){
            delete_account_confirmation_modal.style.display = 'block';
            document.body.style.overflow = "hidden";
        });
    });
    cancel_delete_account.addEventListener('click', function(){
        delete_account_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    })
    window.addEventListener('click', function(event){
        if(event.target === delete_account_confirmation_modal){
            delete_account_confirmation_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  
}
deleteAccountConfirmation();