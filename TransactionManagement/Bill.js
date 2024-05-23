import * as JS from '../main/mainJS.js';


// Lấy các giá trị từ các tham số truy vấn
document.addEventListener('DOMContentLoaded', loadBill)

function loadBill() {
        var queryParams = new URLSearchParams(window.location.search);
        var id  = decodeURIComponent(queryParams.get('id'));
        var cus = decodeURIComponent(queryParams.get('cus'));
        var date = decodeURIComponent(queryParams.get('date'));

        document.getElementById("id").textContent = id;
        document.getElementById("customer").textContent = cus;
        document.getElementById("date").textContent = date;

        loadProduct(id);
}

function loadProduct(id) {
        var data =  "id=" + id +
                    "&process=detailCus"
        JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {

                var response = JSON.parse(xhr.responseText);
                var total = 0;
                for (var i = response.length -1; i >= 0; i--) {
                        var detail = response[i];
                        var container = document.getElementById('list_detail');
                
                        // Tạo và thêm phần tử sản phẩm
                        var productName = document.createElement('span');
                        productName.className = 'bill_product_name';
                        productName.innerText = detail.nameProduct;
                        container.appendChild(productName)
                        
                        // Tạo và thêm thẻ break
                        var breakElement = document.createElement('br');
                        container.appendChild(breakElement);

                        // Tạo và thêm chi tiết sản phẩm
                        var productDetails = document.createElement('div');
                        productDetails.className = 'bill_prodcut_details';

                        var quantity = document.createElement('span');
                        quantity.className = 'bill_sl';
                        quantity.innerText = detail.quantity;

                        var unitPrice = document.createElement('span');
                        unitPrice.className = 'bill_dongia';
                        unitPrice.innerText = detail.price;

                        var totalPrice = document.createElement('span');
                        totalPrice.className = 'bill_thanhtien';
                        totalPrice.innerText =  detail.quantity * detail.price;

                        productDetails.appendChild(quantity);
                        productDetails.appendChild(unitPrice);
                        productDetails.appendChild(totalPrice);

                        container.appendChild(productDetails);

                        // Tạo và thêm dòng phân cách
                        var separator = document.createElement('span');
                        separator.innerText = '-----------------------------------';
                        container.appendChild(separator);
                        
                        // Tổng hóa đơn
                        total = total + detail.quantity * detail.price;
                }
                document.getElementById("total").textContent = total;
                var queryParams = new URLSearchParams(window.location.search);
                if(decodeURIComponent(queryParams.get('printer'))) {printBill(id)}
        })
}


// Điều kiện in
function printBill(id) {
        var element = document.getElementById("printer_bill");

        var options = {
                margin: 1,
                filename: id + ".pdf",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    scrollX: 0, 
                    scrollY: 0
                },
                jsPDF: { unit: 'px', format: [element.offsetWidth, element.offsetHeight + 50], orientation: 'portrait' }
            };
            
            // In phần tử printer_bill vào file PDF
            html2pdf(element, options)
}