//Kiểm tra rỗng
export function checkEmpty(element) {
    if(element.value.trim() === "") {return true;}
    return false;
}


//In lỗi
export function printMess(element, mess, messError) {
    mess.textContent = messError;
    element.addEventListener('click', function(event) {
        mess.textContent = "";
    })
}


//Lấy dữ liệu của radio
export function getSelectedGender(element) {
    const genderRadioButtons = document.getElementsByName(element);
    return Array.from(genderRadioButtons).find(radio => radio.checked);
}


//Kiểm tra cấu trúc mail
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


//Kết nối tới PHP
export function connectToPHP(path, data, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", path);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    //Kết nối thành công
    xhr.onload = function () {
        callback(xhr);
    };

    //Kết nối lỗi
    xhr.onerror = function () {
        console.error('Yêu cầu lỗi. Status: ' + xhr.status);
        alert('Hệ thống đang gặp sự cố, vui lòng quay lại sau...');
    };

    xhr.send(data);
}


//Tạo cookie
export function createCookie(username, daysToExpire) {
    var expires = "";
    if (daysToExpire) {
        var date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = username + "= " + encodeURIComponent(username) + expires + "; path=/MobileStore/";
}


export function getAllCookies() {
    var username = "username"; // Tên cookie cần tìm

    // Lấy chuỗi cookie
    var cookies = document.cookie;
    
    // Phân tách chuỗi cookie thành các cặp tên/giá trị
    var cookieArray = cookies.split(';');
    
    // Duyệt qua mỗi cặp tên/giá trị
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim(); // Xóa khoảng trắng dư thừa
        var separatorIndex = cookie.indexOf('=');
        var name = cookie.substring(0, separatorIndex); // Tên của cookie
        var value = cookie.substring(separatorIndex + 1); // Giá trị của cookie
        
        // Nếu tên của cookie trùng khớp với tên cookie cần tìm
        if (name === username) {
            // Giải mã giá trị của cookie và in ra
            var decodedValue = decodeURIComponent(value);
            console.log("Value of cookie " + username + ": " + decodedValue);
            return decodedValue;
        }
    }
    
    // Nếu không tìm thấy cookie có tên như username
    console.log("Cookie " + username + " not found.");
    return null;
}