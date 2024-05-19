import * as JS from '../main/mainJS.js';

const container = document.querySelector('.container');
const loginLink = document.querySelector('.login_link');
const registerLink = document.querySelector('.register_link');
const registerBtn = document.getElementById('btn_register');
const doneBtn = document.getElementById('btn_done');

loginLink.addEventListener('click', () => {
    container.classList.remove('active');
    document.title = "Đăng nhập";
});

registerBtn.addEventListener('click', () => {
    container.classList.remove('active');
    container.classList.add('active2');
    document.title = "Thông báo";
});

doneBtn.addEventListener('click', () => {
    container.classList.remove('active2');
    document.title = "Đăng nhập";
});

var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var remember = document.getElementById('remember');
var mess = document.getElementById('mess');

// XỬ LÍ SỰ KIỆN
document.addEventListener("DOMContentLoaded", function() {
    // Check cookie
    var cookies = document.cookie.split(';');
    var usernameField = document.getElementById('username');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        if (cookie[0] === "user") {
            usernameField.value = decodeURIComponent(cookie[1]);
            console.log("Username from cookie: ", cookie[1]);
            break;
        }
    }
});

// Khi click vào nút ĐĂNG NHẬP
submit.addEventListener('click', function(event) {
    event.preventDefault();

    if (JS.checkEmpty(username)) {
        JS.printMess(username, mess, "Vui lòng nhập username");
        return;
    }

    if (JS.checkEmpty(password)) {
        JS.printMess(password, mess, "Vui lòng nhập password");
        return;
    }

    // Gửi thực thi php
    toSent();
});

// KẾT NỐI PHP
function toSent() {
    var path = "./login/login.php";
    var data = "username=" + encodeURIComponent(username.value) + 
               "&password=" + encodeURIComponent(password.value);
    JS.connectToPHP(path, data, function(xhr) { handle(xhr); });
}

// XỬ LÍ TRẢ VỀ
function handle(xhr) {
    var response = JSON.parse(xhr.responseText);
    console.log(response);

    if (response[0] == false) {
        mess.textContent = response[1];
        return;
    }

    if (remember.checked) {
        var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = "user=" + encodeURIComponent(username.value) + expires + "; path=/MobileStore/";
    }
    window.location.href = "Home/index.html";
}

function checkSession() {
    JS.connectToPHP("./main/checkSession.php", "", function(xhr) {
        window.location.href = xhr.responseText;
    });
}
