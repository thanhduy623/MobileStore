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
        btnmenu.src = "assets/close.svg"; 
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
    })

    var path = "../staff/uploadAvatar.php";
    var data = 'username= ' + email.substring(0, email.value.indexOf("@"));
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
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

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
                var data = 'username= ' + email.substring(0, email.value.indexOf("@")) +
                           'image=' + encodeURIComponent(imageData);
                JS.connectToPHP(path, data, function(xhr) {
                    var urlNewAvatar = xhr.responseText;
                    newAvatar.src = urlNewAvatar;
                });
            };
        }
    });
})

document.addEventListener("DOMContentLoaded", function() {
    var name = document.getElementById('name');
    var role = document.getElementById('role');
    var avatar = document.getElementById('avatar');

    JS.connectToPHP("../main/loadAccount.php", "", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        name.textContent = response[0];
        role.textContent = response[1];
        avatar.src = "../avatar/" + response[2];

        var names = sessionStorage.getItem('name');
    })
});