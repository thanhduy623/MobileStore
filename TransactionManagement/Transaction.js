import * as JS from '../main/mainJS.js';
document.addEventListener('DOMContentLoaded', function() {
    JS.checkSession(function() {});
})



// window.addEventListener('click', function(event){
//     if(event.target === delete_transaction_confirmation_modal){
//         delete_transaction_confirmation_modal.style.display = 'none';
//         document.body.style.overflow = "auto";
//     }
// })  

// Update Create Transaction Modal Height
function updateTransactionContentMaxHeight() {
    var windowHeight = window.innerHeight;
    var newTransactionContentMaxHeight = Math.min(windowHeight - 144, 570); 
    document.querySelector('.create_transaction_content').style.maxHeight = newTransactionContentMaxHeight + 'px';
}
window.addEventListener('load', updateTransactionContentMaxHeight);
window.addEventListener('resize', updateTransactionContentMaxHeight);
var createTransactionContent = document.querySelector('.create_transaction_content');
var createTransactionHeader = document.querySelector('.create_transaction_header');
var createTransactionFooter = document.querySelector('.create_transaction_footer');
function updateTransactionContentHeight() {
    var windowHeight = window.innerHeight;
    var headerHeight = createTransactionHeader.offsetHeight;
    var footerHeight = createTransactionFooter.offsetHeight;
    var newTransactionContentHeight = windowHeight - headerHeight - footerHeight - 25;
    createTransactionContent.style.height = newTransactionContentHeight + 'px';
}
window.addEventListener('DOMContentLoaded', updateTransactionContentHeight);
window.addEventListener('resize', updateTransactionContentHeight);
window.addEventListener('click', function(event){
    if(event.target === create_transaction_modal){
        create_transaction_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
}) 


// Transaction Details Modal
var transaction_box = document.getElementsByClassName('transaction_box');
var transaction_details_modal = document.getElementById('transaction_details_modal');

// Create Transaction Modal
var create_transaction_modal = document.getElementById('create_transaction_modal');



// Tải giao dịch
document.addEventListener('DOMContentLoaded', loadTran);

// Nhấn vào nút thêm giao dịch
document.getElementById('create_transaction_btn').addEventListener('click', addTransaction);

// Nút hủy giao dịch
document.getElementById('cancel').addEventListener('click', cancel);


 // Lấy thông tin khách hàng từ số điện thoại
document.getElementById("transaction_customer_phone_number").addEventListener('click', getCustomer);

// Tạo dòng item sản phẩm
document.getElementById("addItem").addEventListener('click', createItem);

// Tìm kiếm
document.getElementById("find").addEventListener('input', find)


document.getElementById('cancel_details').addEventListener('click', function(){
    transaction_details_modal.style.display = 'none';
    document.body.style.overflow = "auto";
});

window.addEventListener('click', function(event){
    if(event.target === transaction_details_modal){
        transaction_details_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
});



//////////////////////////////////////////////////////////////////////
document.getElementById("transaction_customer_phone_number").addEventListener('input', getCustomer)

// Tính tiền thối
document.getElementById("transaction_received_money").addEventListener('input', compute)

//////////////////////////////////////////////////////////////////////

function addTransaction() {
    create_transaction_modal.style.display = 'block';
    document.body.style.overflow = "hidden";
    document.getElementById("transaction_date").valueAsDate = new Date();
    document.getElementById("create").addEventListener('click', transaction)
    
    clear();
    createID();
    document.getElementById("transaction_customer_phone_number").focus();
}

function createID() {
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if (day < 10) {day = '0' + day;}
    if (month < 10) {month = '0' + month;}
    year = year.toString().slice(-2);

    var data =  "date=" + year + month + day +
                "&process=createId"
    JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText);

        if(!response[0]) {
            alert(response[1]);
            document.getElementById("cancel").click();
            return;
        }

        document.getElementById("transaction_id").value = response[1]
    })
}


function getList() {
    JS.connectToPHP("../ProductManagement/product.php","process=load", function(xhr) {
        var response = JSON.parse(xhr.responseText);

        var dataList = document.getElementById('product_ids');
        for (var i = 0; i < response.length; i++) {
            var product = response[i];
            var option = document.createElement('option');
            option.value = product.idProduct + "-" + product.nameProduct;;
            dataList.appendChild(option);
        }            
    })
}


function getCustomer() {
    var phone = document.getElementById("transaction_customer_phone_number");
    var name = document.getElementById("transaction_customer_name");
    var address = document.getElementById("transaction_customer_address");

    if(phone.value.length != 10) {
        name.value = "";
        address.value = "";
        return;
    }

    var data =  "phone=" + phone.value +
                "&process=loadCustomer"
    JS.connectToPHP("../TransactionManagement/Transaction.php",data, function(xhr) {        
        var response = JSON.parse(xhr.responseText);

        //Lỗi kết nối truy vấn
        if(response[1] == "Lấy dữ liệu khách hàng thất bại") {
            alert(response[1]);
            phone.value = "";
            name.value = "";
            address.value = "";
            return;
        }

        //Khách hàng chưa tồn tại và phải khởi tạo
        if(response[1] == "Khách hàng chưa tồn tại") {
            if (!window.confirm("Bạn có muốn tạo khách hàng mới?")) {
                phone.value = "";
                name.value = "";
                address.value = "";
            }

            document.getElementById("transaction_customer_phone_number").readOnly = true;
            document.getElementById("transaction_customer_address").readOnly = false;
            document.getElementById("transaction_customer_name").readOnly = false;
            document.getElementById("transaction_customer_name").focus();
            return;
        }

        document.getElementById("transaction_customer_address").value = response[1].address;
        document.getElementById("transaction_customer_name").value = response[1].fullName;
        document.getElementById("transaction_product_id").focus();
    })
}

function createItem() {
    var id = document.getElementById("transaction_product_id").value;
    var nu = document.getElementById("transaction_product_quanity").value;

    //Kiểm tra đầu vào
    if(id.length == 0) {
        alert("Không thể thêm sản phẩm khi mã trống");
        return;
    }

    if (id.indexOf("-") !== -1) {
        id = id.substring(0, id.indexOf("-"));
    }

    //Kiểm tra đầu vào
    if(nu.length == 0 || nu < 1) {
        alert("Số lượng phải lớn hơn 0");
        return;
    }

    //Check trùng
    var isDuplicate = false;
    Array.from(document.getElementsByClassName("b_product_id")).forEach(function(productIdElement) {
        if(productIdElement.textContent == id) {
            //Không cập nhật lại
            if (!window.confirm("Sản phẩm đã có trong danh sách, bạn có muốn cật nhật lại?")) {
                isDuplicate = true;
                return;
            }

            //Cập nhật lại
            document.getElementById("product_list_box_" + id).remove();
        }
    });
    if(isDuplicate) {return}


    //Lấy thông tin sản phẩm
    var data = "id=" + id + "&process=loadProduct" 
    JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText);

        //Lỗi kết nối truy vấn
        if(response[1] == "Lấy dữ liệu sản phẩm thất bại") {
            alert(response[1]);
            return;
        }

        //Khách hàng chưa tồn tại và phải khởi tạo
        if(response[1] == "Sản phẩm không tồn tại") {
            alert("Mã sản phẩm không tồn tại");
            document.getElementById("transaction_product_id").focus();
            return;
        }

        if(nu > response[1].remain) {
            alert("Số lượng trong kho không đủ (Còn lại: " + response[1].remain + ")");
            document.getElementById("transaction_product_quanity").focus();
            return;
        }

        //Thêm đối tượng
        addItem(id, response[1].nameProduct, response[1].price, nu);
        document.getElementById("transaction_product_id").value = "";
        document.getElementById("transaction_product_quanity").value = 1;
    })
}

function compute() {
    var total = document.getElementById("transaction_total");
    var repay = document.getElementById("transaction_return_money");
    var recieved = document.getElementById("transaction_received_money");

    if(parseInt(total.value, 10) == 0) {repay.value = 0; return;}
    if(parseInt(recieved.value, 10) < parseInt(total.value, 10)) {repay.value = 0; return;}

    repay.value = parseInt(recieved.value, 10) - parseInt(total.value, 10)
}

function addItem(id, name, price, num) {
    // Tạo khối
    var productList = document.getElementById("transaction_product_list");
    var productBox = document.createElement("div");
    productBox.className = "transaction_product_list_box";
    productBox.id = "product_list_box_" + id;

    // Tạo các phần tử <p> và thêm nội dung cho chúng
    var productId = document.createElement("p");
    productId.className = "b_product_id";
    productId.id = "b_product_" + id;
    productId.textContent = id; // ID sản phẩm mới

    var productName = document.createElement("p");
    productName.className = "b_product_name";
    productName.textContent = name;

    var productQuantity = document.createElement("p");
    productQuantity.className = "b_product_quantity";
    productQuantity.textContent = num;

    var productPrice = document.createElement("p");
    productPrice.className = "b_product_price"
    productPrice.id = "b_product_price";
    productPrice.textContent = price;

    var productTotal = document.createElement("p");
    productTotal.className = "b_product_total";
    productTotal.textContent = price * num;

    var minusButton = document.createElement("button");
    minusButton.className = "minus-button";
    minusButton.textContent = "-";

    // Thêm các phần tử <p> vào khối transaction_product_list_box
    productBox.appendChild(productId);
    productBox.appendChild(productName);
    productBox.appendChild(productQuantity);
    productBox.appendChild(productPrice);
    productBox.appendChild(productTotal);
    productBox.appendChild(minusButton);

    minusButton.addEventListener('click', function() {deleteItem(id, price * num)})

    // Thêm khối transaction_product_list_box vào transaction_product_list
    productList.appendChild(productBox);

    var sum = document.getElementById("transaction_total")
    sum.value = parseInt(sum.value, 10) + price * num;
}

function deleteItem(id, price) {
    document.getElementById("product_list_box_" + id).remove();
    document.getElementById("transaction_total").value = document.getElementById("transaction_total").value - price;
    compute();

    JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText);
    })
}

function transaction() {
    var idBill = document.getElementById("transaction_id");   
    var created = document.getElementById("transaction_date");
    var total = document.getElementById("transaction_total");
    var recei = document.getElementById("transaction_received_money");
    var phone = document.getElementById("transaction_customer_phone_number");
    var name = document.getElementById("transaction_customer_name");
    var addess = document.getElementById("transaction_customer_address");
    if(phone.value.length == 0) {
        alert("Vui lòng nhập số điện thoại khách hàng");
        phone.focus();
        return;
    }

    if(phone.value.length != 10 || name.value.length == 0 || addess.value.length == 0) {
        alert("Vui lòng kiểm tra lại thông tin khách hàng");
        phone.focus();
        return;
    }
    
    if(total.value == 0) {
        alert("Chưa thêm sản phẩm nào vào giao dịch");
        return;
    }

    if(recei.value == 0) {
        alert("Chưa nhận tiền từ khách hàng");
        recei.focus();
        return;
    }

    
    // Tạo mảng lưu chi tiết sản phẩm
    var productInfoArray = [];
    var productIds = document.getElementsByClassName("b_product_id");
    var productQuantities = document.getElementsByClassName("b_product_quantity");

    for (var i = 0; i < productIds.length; i++) {
        var productId = productIds[i].textContent;
        var productQuantity = productQuantities[i].textContent;
        productInfoArray.push([productId, productQuantity]);
    }

    
    // Thêm giao dịch
    var data =  "idBill=" + idBill.value +
                "&phone=" + phone.value +
                "&name=" + name.value +
                "&address=" + addess.value +
                "&created=" + created.value +
                "&total=" + total.value +
                "&detail=" + JSON.stringify(productInfoArray) +
                "&process=addBill"
    JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {
        if(JSON.parse(xhr.responseText)[0]) {alert(JSON.parse(xhr.responseText)[1])}
        loadTran();
    })
    document.getElementById("cancel").click();
}




function cancel() {
    create_transaction_modal.style.display = 'none';
    document.body.style.overflow = "auto";
    clear();
}

function clear() {
    document.getElementById("transaction_customer_phone_number").value = "";
    document.getElementById("transaction_customer_name").value = "";
    document.getElementById("transaction_customer_address").value = "";
    document.getElementById("transaction_product_id").value = "";
    document.getElementById("transaction_product_quanity").value = "";

    document.getElementById("transaction_total").value = 0;
    document.getElementById("transaction_received_money").value = 0;
    document.getElementById("transaction_return_money").value = 0;

    document.getElementById("transaction_customer_phone_number").readOnly = false;
    document.getElementById("transaction_customer_name").readOnly = true;
    document.getElementById("transaction_customer_address").readOnly = true;

    document.querySelectorAll(".transaction_product_list_box").forEach(function(productBox) {productBox.remove();});
}

function loadTran() {
    document.querySelectorAll(".transaction_box").forEach(function(element) {element.remove();});

    JS.connectToPHP("../TransactionManagement/Transaction.php", "process=loadTransaction", function(xhr) {
        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < response.length; i++) {
            var bill = response[i];
            
            var transactionBox = document.createElement("div");
            transactionBox.classList.add("transaction_box");
            transactionBox.id = bill.idBill + "-" + bill.phone + "-" + bill.total;

            // Tạo phần tử p cho mã giao dịch
            var maGiaoDich = document.createElement("p");
            maGiaoDich.id = "b_tr_ma";
            maGiaoDich.className = "find"
            maGiaoDich.textContent = bill.idBill;
            transactionBox.appendChild(maGiaoDich);

            // Tạo input cho ngày giao dịch
            var ngayGiaoDich = document.createElement("input");
            ngayGiaoDich.type = "date";
            ngayGiaoDich.id = "b_tr_ngay";
            ngayGiaoDich.value = bill.created;
            transactionBox.appendChild(ngayGiaoDich);

            // Tạo phần tử p cho tên khách hàng
            var tenKhachHang = document.createElement("p");
            tenKhachHang.id = "b_tr_kh_hang";
            tenKhachHang.textContent = bill.fullname;
            transactionBox.appendChild(tenKhachHang);

            // Tạo phần tử p cho tổng tiền
            var tongTien = document.createElement("p");
            tongTien.id = "b_tr_tongtien";
            tongTien.textContent = bill.total;
            transactionBox.appendChild(tongTien);

            // Thêm khối được tạo vào trong một phần tử cha trong DOM
            document.getElementById("transaction_main_content").appendChild(transactionBox);
            transactionBox.addEventListener('click', seeDetail)
        }
    })

    getList();
}

function seeDetail() {
    transaction_details_modal.style.display = 'block';
    document.body.style.overflow = "hidden";

    var id = this.id.split('-')[0];
    document.getElementById("transaction_details_id").value = id;
    document.getElementById("transaction_details_date").value = this.id.split('-')[1];
    document.getElementById("transaction_details_total").value = this.id.split('-')[2]; 
    
    
    document.querySelectorAll(".transaction_product_list_box").forEach(function(element) {element.remove();});


    var data = "id=" + id + "&process=loadDetail"
    JS.connectToPHP("../TransactionManagement/Transaction.php", data, function(xhr) {
        var response = JSON.parse(xhr.response)
        for (var i = 0; i < response.length; i++) {
            var detail = response[i];
            createLineItem(detail.idProduct, detail.nameProduct, detail.quantity, detail.price)
            
        }
    })

    function createLineItem(id, name, quantity, price) {
        var productBox = document.createElement("div");
            productBox.classList.add("transaction_product_list_box");

            // Tạo và gán giá trị cho phần tử p b_product_id
            var productId = document.createElement("p");
            productId.id = "b_product_id";
            productId.innerText = id;

            // Tạo và gán giá trị cho phần tử p b_product_name
            var productName = document.createElement("p");
            productName.id = "b_product_name";
            productName.innerText = name;

            // Tạo và gán giá trị cho phần tử p b_product_quantity
            var productQuantity = document.createElement("p");
            productQuantity.id = "b_product_quantity";
            productQuantity.innerText = quantity;

            // Tạo và gán giá trị cho phần tử p b_product_price
            var productPrice = document.createElement("p");
            productPrice.id = "b_product_price";
            productPrice.innerText = price;

            // Tạo và gán giá trị cho phần tử p b_product_total
            var productTotal = document.createElement("p");
            productTotal.id = "b_product_total";
            productTotal.innerText = price * quantity;

            // Gắn các phần tử vào productBox
            productBox.appendChild(productId);
            productBox.appendChild(productName);
            productBox.appendChild(productQuantity);
            productBox.appendChild(productPrice);
            productBox.appendChild(productTotal);

            // Gắn productBox vào transaction_product_list
            document.getElementById("transaction_product_list_see").appendChild(productBox);
    }
}

function find() {
    var searchText = document.getElementById('find').value.trim().toLowerCase();
    var transactionBoxes = document.querySelectorAll('.transaction_box');
    var i = 0;
    transactionBoxes.forEach(function(transactionBox) {
        var uHoTen = transactionBox.querySelector('#b_tr_kh_hang').textContent.toLowerCase();
        if (searchText === "") {
            transactionBox.style.display = 'flex';
        } else {
            if (uHoTen.includes(searchText)) {
                transactionBox.style.display = 'flex';
            } else {
                transactionBox.style.display = 'none';
            }
        }
    });
}


document.getElementById("transaction_total").addEventListener('click', printer)

// function printer() {
//     var element = document.getElementById("create_transaction_container");
//     console.log('Element height:', element.offsetHeight);
//     console.log('Element width:', element.offsetWidth);
//     console.log('Element content:', element.innerHTML);

//     html2pdf(element, {
//         margin: 1,
//         filename: 'transaction.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2, scrollX: 0, scrollY: 0, windowWidth: document.documentElement.offsetWidth, windowHeight: document.documentElement.offsetHeight },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     });
// }