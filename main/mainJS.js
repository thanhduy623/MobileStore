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
export function getRadio(element) {
    const genderRadios = document.querySelectorAll(`input[name="${element}"]`);
    for (let radio of genderRadios) {
        if (radio.checked) {
            return radio;
        }
    }
    return false;
}


//Kiểm tra select đã được chọn chưa
export function getSelected(name) {
    var element = document.getElementById(name);
    if (element.selectedIndex === 0) {
        return element.options[0];
    } else {
        return element.options[element.selectedIndex];
    }
}

export function checkPhone(element) {
    var regex = /^0\d{9}$/;
    return regex.test(element.value);
}

export function checkDate(day, month, year) {
    // Chuyển đổi ngày, tháng, năm từ chuỗi sang số nguyên
    day = day.valuel
    month = month.value;
    year = year.value;

    // Kiểm tra xem ngày, tháng, năm có hợp lệ không
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false; // Ngày, tháng, năm không phải là số
    }

    if (month < 1 || month > 12) {
        return false; // Tháng không hợp lệ
    }

    // Kiểm tra số ngày trong tháng
    var daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false; // Ngày không hợp lệ cho tháng và năm đã cho
    }

    if (year < 0) {
        return false; // Năm không được âm
    }

    // Nếu tất cả các điều kiện đều đúng, ngày là hợp lệ
    return true;
}


//Kiểm tra cấu trúc mail
export function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
}
