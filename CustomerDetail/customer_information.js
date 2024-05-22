import * as JS from '../main/mainJS.js';
document.addEventListener('DOMContentLoaded', function() {
    JS.checkSession(function() {});
})


// Lấy các giá trị từ các tham số truy vấn
var queryParams = new URLSearchParams(window.location.search);
document.getElementById("customer_phone").value = decodeURIComponent(queryParams.get('inf1'));
document.getElementById("customer_name").value = decodeURIComponent(queryParams.get('inf2'));
document.getElementById("customer_address").value = decodeURIComponent(queryParams.get('inf3'));
document.getElementById("transaction_details_date").value = decodeURIComponent(queryParams.get('inf1'));
document.getElementById("transaction_details_name").value = decodeURIComponent(queryParams.get('inf2'));


var transactionBoxes = document.querySelectorAll('.transaction_box');
var transactionDetailsModal = document.getElementById('transaction_details_modal');
var cancelDetailsButton = document.getElementById('cancel_details');

document.addEventListener('DOMContentLoaded', loadBill)


transactionBoxes.forEach(box => {
    box.addEventListener('click', () => {
        transactionDetailsModal.style.display = 'block'; 
        document.body.style.overflow = "hidden"; 
    });
});

cancelDetailsButton.addEventListener('click', () => {
    transactionDetailsModal.style.display = 'none';
    document.body.style.overflow = "    auto"; 
});


function loadBill() {
    JS.connectToPHP("../TransactionManagement/Transaction.php", "process=loadTransaction", function(xhr) {
        var response = JSON.parse(xhr.responseText);

        for (var i = response.length -1; i >= 0; i--) {
            var bill = response[i];
            if(bill.phone != document.getElementById("customer_phone").value) {continue;}
            var transactionBox = document.createElement("div");
            transactionBox.className = "transaction_box";

            // Tạo các phần tử p và thêm nội dung cho chúng
            var bCusMa = document.createElement("p");
            bCusMa.id = "b_cus_ma";
            bCusMa.textContent = bill.idBill;

            var bCusNgay = document.createElement("p");
            bCusNgay.id = "b_cus_ngay";
            bCusNgay.textContent = bill.created;

            var bCusTongtien = document.createElement("p");
            bCusTongtien.id = "b_cus_tongtien";
            bCusTongtien.textContent = bill.total;

            // Thêm các phần tử p vào transactionBox
            transactionBox.appendChild(bCusMa);
            transactionBox.appendChild(bCusNgay);
            transactionBox.appendChild(bCusTongtien);


            document.getElementById("transaction_main_content").appendChild(transactionBox);
            transactionBox.addEventListener('click', seeDetail(bill.idBill))
        }
    })
}

function seeDetail(idBill) {
    return function() {
        alert(idBill)
        var data =  "id=" + idBill +
                    "&process=detailCus"
        JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {
            var response = JSON.parse(xhr.responseText);
            for (var i = response.length -1; i >= 0; i--) {
                var bill = response[i];
                console.log(bill)
            }
        })
    }
}