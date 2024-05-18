import * as JS from '../main/mainJS.js';

// Mobile devices menu
const menu = document.querySelector('#menu-icon');
const btnmenu = menu.querySelector('img');
const initialSrc = btnmenu.src;
const navigation = document.querySelector('.navigation');

let isOpen = false;

menu.addEventListener('click', () => {
    if (isOpen) {
        btnmenu.src = initialSrc; 
    } else {
        btnmenu.src = "../assets/close.svg"; 
    }
    isOpen = !isOpen; 
    navigation.classList.toggle('open');
});

// indicator movement
document.addEventListener("DOMContentLoaded", function() {
    const navigationItems = document.querySelectorAll(".navigation .list");
    const indicator = document.querySelector(".indicator");

    function adjustIndicatorPosition() {
        const windowWidth = window.innerWidth;
        let activeItem = document.querySelector(".navigation .list.active");

        if (activeItem) {
            const index = Array.from(activeItem.parentNode.children).indexOf(activeItem);
            let translateXValue;

            if (windowWidth >= 1280) {
                translateXValue = `translateX(calc(5.32em * ${index}))`;
            } else if (windowWidth >= 1090) {
                translateXValue = `translateX(calc(4.05em * ${index}))`;
            } else {
                translateXValue = `translateX(calc(4.05em * ${index}))`;
            }

            indicator.style.transform = translateXValue;
        }
    }

    adjustIndicatorPosition();
    window.addEventListener("resize", adjustIndicatorPosition);

    navigationItems.forEach(item => {
        item.addEventListener("click", function() {
            navigationItems.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            adjustIndicatorPosition();
        });
    });
});

// scroll effect
window.addEventListener('scroll', function() {
    const windowWidth = window.innerWidth;
    
    if (window.scrollY > 100 && windowWidth >= 1090) { 
        document.querySelector('header').classList.add('scroll');
        document.querySelector('main').classList.add('scroll');
        document.querySelector('.user_modal_content').classList.add('scroll');
    } else {
        document.querySelector('header').classList.remove('scroll');
        document.querySelector('main').classList.remove('scroll');
        document.querySelector('.user_modal_content').classList.remove('scroll');
    }
});

// remove scroll effect in mobile devices
function removeScrollClass() {
    const windowWidth = window.innerWidth;
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    if (windowWidth < 1080) {
        header.classList.remove('scroll');
        main.classList.remove('scroll');
    }
}
window.addEventListener('resize', removeScrollClass);
document.addEventListener('DOMContentLoaded', removeScrollClass);

// prevent auto scroll 
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu a');

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 
        });
    });
});

// Menu modal
document.addEventListener('DOMContentLoaded', function() {
    const user_modal = document.getElementById('user_modal');
    const basic_info = document.getElementById('basic_info');
    const profile = document.getElementById('profile');
    const account = document.getElementById('account');
    const setting = document.getElementById('setting');
    const help = document.getElementById('help');
    const themes = document.getElementById('themes');
    const logout = document.getElementById('logout');

    const user = document.getElementById('user');
    user.addEventListener('click', function() {
        user_modal.style.display = 'block';
    }); 

    window.addEventListener('click', function(event) {
        if (event.target === user_modal) {
            user_modal.style.display = 'none';
        }
    });
});

// Create sale account modal
document.addEventListener('DOMContentLoaded', function() {
    const create_account_btn = document.getElementById('create_account_btn');
    const create_account_modal = document.getElementById('create_account_modal');
    const cancel = document.getElementById('cancel');
    create_account_btn.addEventListener('click', function(){
        create_account_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    })

    cancel.addEventListener('click', function(){
        create_account_modal.style.display = 'none';
        document.body.style.overflow = "auto";
        var newAvatar = document.getElementById("avatar_upload");
        newAvatar.src = "../assets/logo_square.png" 
    })

    window.addEventListener('click', function(event){
        if(event.target === create_account_modal){
            create_account_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  
})


// resize create modal
function updateContentMaxHeight() {
    const windowHeight = window.innerHeight;
    const newContentMaxHeight = windowHeight - 144; // Trừ 25px

    document.querySelector('.create_account_content').style.maxHeight = newContentMaxHeight + 'px';
}

window.addEventListener('load', updateContentMaxHeight);
window.addEventListener('resize', updateContentMaxHeight);
const createAccountContent = document.querySelector('.create_account_content');
const createAccountHeader = document.querySelector('.create_account_header');
const createAccountFooter = document.querySelector('.create_account__footer');

function updateContentHeight() {
    const windowHeight = window.innerHeight;
    const headerHeight = createAccountHeader.offsetHeight;
    const footerHeight = createAccountFooter.offsetHeight;

    const newContentHeight = windowHeight - headerHeight - footerHeight - 25;

    createAccountContent.style.height = newContentHeight + 'px';
}
window.addEventListener('DOMContentLoaded', updateContentHeight);
window.addEventListener('resize', updateContentHeight);



// 
const header = document.querySelector('header');
const headerCover = document.querySelector('.header_cover');

function updateHeaderCover() {
    const headerRect = header.getBoundingClientRect();
    headerCover.style.width = `${headerRect.width}px`;
    headerCover.style.height = `${headerRect.height}px`;
    headerCover.style.top = `${headerRect.top}px`;
    headerCover.style.left = `${headerRect.left}px`;
}

updateHeaderCover();

window.addEventListener('resize', updateHeaderCover);
window.addEventListener('scroll', updateHeaderCover);

//XỬ LÍ THÊM NHÂN VIÊN

var btnCreate = document.getElementById("create");
var lName = document.getElementById("upload_name");
var fName = document.getElementById("upload_surname");
var phone = document.getElementById("upload_phone");
var email = document.getElementById("upload_email");
var dd = document.getElementById("upload_date");
var mm = document.getElementById("upload_month");
var yy = document.getElementById("upload_year");
var btnAvatar = document.getElementById("upload_photo");
var newAvatar = document.getElementById("avatar_upload"); 
var btnCancel = document.getElementById("cancel");


btnCreate.addEventListener('click', function(event){
    event.preventDefault();
    if(!checkInput()) {
        return;
    }

    var path = "../staff/addStaff.php";
    var data =  "name=" + encodeURIComponent(lName.value + " " + fName.value) + 
                "&phone=" + encodeURIComponent(phone.value) +
                "&email=" + encodeURIComponent(email.value) +
                "&gender=" + encodeURIComponent(JS.getRadio('gender').value) +
                "&birth=" + encodeURIComponent(yy.value +"/"+mm.value+"/"+dd.value) +
                "&roled=" + encodeURIComponent(JS.getSelected("upload_role").value);

    
    JS.connectToPHP(path, data, function(xhr) 
    {
        var response = JSON.parse(xhr.responseText);
        alert(response[1]);
        loadStaff();
    })

    var path = "../staff/replaceAvatar.php";
    var data = 'username=' + email.value.substring(0, email.value.indexOf("@"));
    JS.connectToPHP(path, data, function(xhr) {
        return;
    });
    btnCancel.click();
})

function checkInput() {
    var day = dd + "/" + mm + "/" + yy;

    if(JS.checkEmpty(lName)) {
        alert("Vui lòng nhập tên của nhân viên");
        return false;
    }

    if(JS.checkEmpty(fName)) {
        alert("Vui lòng nhập họ của nhân viên");
        return false;
    }

    if(JS.checkEmpty(phone)) {
        alert("Vui lòng nhập số điện thoại của nhân viên");
        return false;
    }


    if(!(JS.checkPhone(phone))) {
        alert("Vui lòng nhập đúng định dạng số điện thoại");
        return false;
    }

    if(JS.checkEmpty(email)) {
        alert("Vui lòng nhập email của nhân viên");
        return false;
    }

    if(!(JS.checkEmail(email))) {
        alert("Vui lòng nhập đúng định dạng email");
        return false;
    }

    if(!JS.getRadio('gender')) {
        alert("Vui lòng chọn giới tính của nhân viên");
        return false;
    } 

    if(JS.checkDate(dd, mm, yy)) {
        alert("Vui lòng chọn ngày sinh của nhân viên");
        return false;
    }

    
    return true;
}

btnAvatar.addEventListener('click', function(event){
    //Kiểm tra đã nhập email chưa
    //Tên file lưu theo 
    if(JS.checkEmpty(email)) {
        alert("Vui lòng nhập email trước khi cập nhật ảnh");
        email.focus();
        return;
    }

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
                var data = 'email=' + encodeURIComponent(email.value) +
                           '&image=' + encodeURIComponent(imageData);
                JS.connectToPHP(path, data, function(xhr) {
                    //Cập nhật ảnh mới
                    newAvatar.src = xhr.responseText;
                });
            };
        }
    });

    input.click();
})

document.addEventListener("DOMContentLoaded", function() {
    var name = document.getElementById('name');
    var role = document.getElementById('role');
    var avatar = document.getElementById('avatar');

    JS.connectToPHP("../main/loadAccount.php", "", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        name.textContent = response[0];
        role.textContent = response[1];
        avatar.src = response[2];
    })

    loadStaff();
    logout();   
});


function logout() {
    var logout = document.getElementById("logout");
    logout.addEventListener('click', function(e) {
        JS.connectToPHP("../main/logout.php","", function(xhr) {
            window.location.href = xhr.responseText;
        })
    })
}



function loadStaff() {
    var userBoxes = document.querySelectorAll(".user_box");
    // Lặp qua từng phần tử và xóa nó
    userBoxes.forEach(function(userBox) {
        userBox.remove();
        // console.log(userBox);
    });

    JS.connectToPHP("../staff/loadStaff.php","", function (xhr){
        var response = JSON.parse(xhr.responseText);
        for (var i = 0; i < response.length; i++) {
            createLineStaff(i+1, response[i][0], response[i][1], response[i][2]);
        }
    });
}

// Hàm gói lại để bảo vệ giá trị của i
function createLineStaff(num, name, email, roled) {
    // Khởi tạo khối user
    var userBox = document.createElement("div");
    userBox.classList.add("user_box");
    
    // Tạo và thiết lập các phần tử HTML với thông tin từ mỗi dòng
    var uStt = document.createElement("p");
    uStt.id = "u_stt";
    uStt.textContent = num;
    userBox.appendChild(uStt);
    
    var uHoTen = document.createElement("p");
    uHoTen.id = "u_ho_ten";
    uHoTen.textContent = name;
    userBox.appendChild(uHoTen);
    
    var uDiaChiEmail = document.createElement("p");
    uDiaChiEmail.id = "u_diachi_email";
    uDiaChiEmail.textContent = email;
    userBox.appendChild(uDiaChiEmail);
    
    var uChucVu = document.createElement("div");
    uChucVu.id = "u_chuc_vu";
    var innerUChucVu = document.createElement("p");
    innerUChucVu.id = "inner_u_chuc_vu";
    innerUChucVu.textContent = roled;
    uChucVu.appendChild(innerUChucVu);
    userBox.appendChild(uChucVu);
    
    // Tạo nút chỉnh sửa
    var editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.classList.add("edit_btn");
    var editImg = document.createElement("img");
    editImg.src = "../assets/create-outline.svg";
    editBtn.appendChild(editImg);

    // Tạo nút xóa
    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete_btn");
    var deleteImg = document.createElement("img");
    deleteImg.src = "../assets/sentMail.png";
    deleteBtn.appendChild(deleteImg);

    // Tạo div chứa nút chỉnh sửa và xóa
    var editDelete = document.createElement("div");
    editDelete.classList.add("edit_delete");
    editDelete.appendChild(editBtn);
    editDelete.appendChild(deleteBtn);
    userBox.appendChild(editDelete);

    // Tách mail thành username
    var username = email.split('@').shift();

    // Gán sự kiện click cho nút chỉnh sửa
    editBtn.addEventListener('click', createEditHandler(username));

    // Gán sự kiện click cho nút xóa
    deleteBtn.addEventListener('click', createDeleteHandler(username, email, name));

    // Thêm userBox vào listStaff
    listStaff.appendChild(userBox);
}


// Hàm tạo line thông tin
function createEditHandler(username) {
    return function() {
        window.location.href = "../profile?username=" + btoa(username) + "&view=" + btoa("admin");
    };
}


function createDeleteHandler(username, email, name) {
    return function() {
        var data =  "username= " + username +
                    "&email= " + email +
                    "&name=" + name +
                    "&sentAgain=" + true;
        JS.connectToPHP("../staff/sentMail.php", data, function(xhr){
            alert(JSON.parse(xhr.responseText)[1]);
        })
    };
}

// Thêm sự kiện input vào ô findText
document.getElementById('findText').addEventListener('input', function() {
    var searchText = this.value.trim().toLowerCase(); // Chuyển đổi kí tự nhập vào thành chữ thường để so sánh dễ dàng hơn
    
    // Lặp qua tất cả các user_box
    var userBoxes = document.querySelectorAll('.user_box');
    userBoxes.forEach(function(userBox) {
        // Lấy nội dung của u_ho_ten và chuyển đổi thành chữ thường
        var uHoTen = userBox.querySelector('#u_ho_ten').textContent.toLowerCase();
        
        // Kiểm tra xem searchText có rỗng không
        if (searchText === "") {
            // Nếu searchText rỗng, hiển thị tất cả các user_box
            userBox.style.display = 'flex';
        } else {
            // Ngược lại, kiểm tra xem uHoTen có chứa searchText không
            if (uHoTen.includes(searchText)) {
                // Nếu có, hiển thị user_box
                userBox.style.display = 'flex';
            } else {
                // Ngược lại, ẩn đi user_box
                userBox.style.display = 'none';
            }
        }
    });
});

document.getElementById("profile").addEventListener('click', function() {
    JS.connectToPHP("../main/loadAccount.php","", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        window.location.href = "../profile?username=" + btoa(response[3]) + "&view=" + btoa(response[1]);
    })
})