import * as JS from '../main/mainJS.js';


// Lấy giá trị của biến username từ query parameters
var queryParams = new URLSearchParams(window.location.search);
var username = queryParams.get('username');

document.addEventListener('DOMContentLoaded', function() {
  loadInformation();  
})


document.getElementById("reset").addEventListener('click', function() {
    loadInformation();
})


function loadInformation() {
    JS.connectToPHP("../profile/loadInformation.php","username=" + username, function(xhr){
        var responseData = JSON.parse(xhr.responseText);

        document.getElementById("infor_name").value = responseData.fullname;
        document.getElementById("infor_phone").value = responseData.phone;
        document.getElementById("infor_email").value = responseData.email;
        document.getElementById("infor_date").value = responseData.dateBirth.slice(9,10);
        document.getElementById("infor_month").value = responseData.dateBirth.slice(6,7);
        document.getElementById("infor_year").value = responseData.dateBirth.slice(0,4);
        
        
    })
}