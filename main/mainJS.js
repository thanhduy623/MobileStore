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
    const genderRadioButtons = document.getElementsByName(element);
    const selectedRadio = Array.from(genderRadioButtons).find(radio => radio.checked);

    if (!selectedRadio) {
        console.log("Không có lựa chọn nào được chọn.");
        return null;
    }

    // Trả về radio được chọn
    return selectedRadio;
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
    console.log(regex.test(element.value));
    return regex.test(element.value);
}

export function getDate(day, month, year) {
    const date = new Date(year, month - 1, day);

    if (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
    ) {
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
        return null;
    }
}


//Kiểm tra cấu trúc mail
export function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
