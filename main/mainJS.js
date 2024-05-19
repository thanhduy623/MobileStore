export function checkSession() {
    connectToPHP("../main/checkSession.php","", function(xhr) {
        var response = JSON.parse(xhr.responseText);

        if(response[0] == false) {
            alert(response[1]);
            window.location.href = '../index.html';
            return;
        }

        if(response[1][4] == -1) {
            alert("Tài khoản của bạn hiện đang bị khóa");
            window.location.href = '../index.html';
            return;
        }

        if(response[1][4] == 0) {
            alert("Vui lòng đổi mật khẩu lần đầu...");
            window.location.href = '../login/login.php';
            return;
        }

        alert("1")
        document.getElementById("user").src = response[1][3];
        document.getElementById("avatar").src = response[1][3];
        document.getElementById("name").src = response[1][1];
        document.getElementById("role").src = response[1][2];
    })
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


//Tải ảnh lên 
export function loadPic(folder, name, frame) {
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
                var data =  "scr=" + folder + name +
                            "&image=" + imageData;
                connectToPHP("../main/loadPic.php", data, function(xhr) {
                    var src = xhr.responseText;
                    frame.src = src;
                });
            };
        }
    });

    input.click();
}


export function loadAccount() {
    var name = document.getElementById('name');
    var role = document.getElementById('role');
    var avatar = document.getElementById('avatar');

    connectToPHP("../main/loadAccount.php", "", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        name.textContent = response[0];
        role.textContent = response[1];
        avatar.src = response[2];
    })

    logout(); 
    seeInfo();  
}

function logout() {
    var logout = document.getElementById("logout");
    logout.addEventListener('click', function(e) {
        connectToPHP("../main/logout.php","", function(xhr) {
            window.location.href = xhr.responseText;
        })
    })
}

function seeInfo() {
    document.getElementById("profile").addEventListener('click', function() {
        connectToPHP("../main/loadAccount.php","", function(xhr) {
            var response = JSON.parse(xhr.responseText);
            var view = "admin";
            if(response[1] != "Quản lí") {view = "staff"}
            window.location.href = "../profile?username=" + btoa(response[3]) + "&view=" + btoa(view);
        })
    })
}
