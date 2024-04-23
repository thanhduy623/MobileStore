import * as JS from '../main/mainJS.js';

const container = document.querySelector('.container');
const loginLink = document.querySelector('.login_link');
const RegisterLink = document.querySelector('.register_link');
const RegisterBtn = document.getElementById('btn_register');
const DoneBtn = document.getElementById('btn_done');


loginLink.addEventListener('click', () => {
    container.classList.remove('active');
    document.title = "Đăng nhập";
});

RegisterBtn.addEventListener('click', () => {
    container.classList.remove('active');
    container.classList.add('active2');
    document.title = "Thông báo";
});

DoneBtn.addEventListener('click', () => {
    container.classList.remove('active2');
    document.title = "Đăng nhập";
});
//
//
//
//XỬ LÍ DỮ LIỆU
//
//
//
var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var remember = document.getElementById('remember');
var mess = document.getElementById('mess');

//Khi click vào nút ĐĂNG NHẬP
submit.addEventListener('click', function(event) {
    //Chan su kien
    event.preventDefault();

    if(JS.checkEmpty(username)) {
        JS.printMess(username, mess, "Vui lòng nhập username");
        return;
    }

    if(JS.checkEmpty(password)) {
        JS.printMess(password, mess, "Vui lòng nhập password");
        return;
    }

    toSent();
})


//Gửi thông tin kết nối tới PHP
function toSent() {
    var path = "login/login.php";
    var data =  "username=" + encodeURIComponent(username.value) + 
                "&password=" + encodeURIComponent(password.value);

    JS.connectToPHP(path, data, function(xhr) {handle(xhr);});
}


//Xử lí dữ liệu trả về từ PHP
function handle() {
    var response = JSON.parse(xhr.responseText);

        if(response[0] == false) {
            mess.textContent = response[1];
            return;
        }

        if(remember.checked) {
            JS.createCookie(username.value, 3);
        }
}

JS.getAllCookies();