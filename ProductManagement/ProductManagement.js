import * as JS from '../main/mainJS.js';
document.addEventListener('DOMContentLoaded', function() {
    JS.checkSession(function() {});
})

if (document.getElementById('role').value === "Bán hàng"){
    alert("HELLO")
}

// Category
document.querySelectorAll('.category_card').forEach(item => {
    item.addEventListener('click', event => {
        var categoryId = item.id; 
        var targetMidTitle = document.querySelector('.midTitle#' + categoryId);
        if (targetMidTitle) {
            var targetTop = targetMidTitle.getBoundingClientRect().top;
            window.scrollTo({
                top: window.scrollY + targetTop - 150,
                behavior: 'smooth'
            });
        }
    });
});


// Update Create New Product Modal Height
function updateProductContentMaxHeight() {
    var windowHeight = window.innerHeight;
    var newProductContentMaxHeight = Math.min(windowHeight - 144, 570); 
    document.querySelector('.create_product_content').style.maxHeight = newProductContentMaxHeight + 'px';
}
window.addEventListener('load', updateProductContentMaxHeight);
window.addEventListener('resize', updateProductContentMaxHeight);
var createProductContent = document.querySelector('.create_product_content');
var createProductHeader = document.querySelector('.create_product_header');
var createProductFooter = document.querySelector('.create_product_footer');
function updateProductContentHeight() {
    var windowHeight = window.innerHeight;
    var headerHeight = createProductHeader.offsetHeight;
    var footerHeight = createProductFooter.offsetHeight;
    var newProductContentHeight = windowHeight - headerHeight - footerHeight - 25;
    createProductContent.style.height = newProductContentHeight + 'px';
}
window.addEventListener('DOMContentLoaded', updateProductContentHeight);
window.addEventListener('resize', updateProductContentHeight);


// Create New Product Modal
var cancel = document.getElementById('cancel');
document.getElementById('create_product_btn').addEventListener('click', function(){
    document.getElementById('create_product_modal').style.display = 'block';
    document.body.style.overflow = "hidden";
    document.getElementById("product_name").value = "";
    document.getElementById("product_cost").value = "";
    document.getElementById("product_price").value = "";
    document.getElementById("upload_product_category").value = "iPhone";
    createID();
})

document.getElementById('input_product_btn').addEventListener('click', function(){
    document.getElementById('input_product_modal').style.display = 'block';
    document.body.style.overflow = "hidden";
    document.getElementById("save_input_product").addEventListener('click', updateInput);
    document.getElementById("cancel_input_product").addEventListener('click', cancelInput);
    getIdProduct();
})
cancel.addEventListener('click', function(){
    create_product_modal.style.display = 'none';
    document.body.style.overflow = "auto";
})
window.addEventListener('click', function(event){
    if(event.target === create_product_modal){
        create_product_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
})  


// Change Product Information Modal
var change_product_infor_modal = document.getElementById('change_product_infor_modal');
var cancel_change_product = document.getElementById('cancel_change_product');

cancel_change_product.addEventListener('click', function(){
    change_product_infor_modal.style.display = 'none';
    document.body.style.overflow = "auto";
})
window.addEventListener('click', function(event){
    if(event.target === change_product_infor_modal){
        change_product_infor_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
})  


// Delete Product Confirmation
var product_delete = document.querySelectorAll('.product_delete');
var delete_product_confirmation_modal = document.getElementById('delete_product_confirmation_modal');
var cancel_delete_product = document.getElementById('cancel_delete_product');
product_delete.forEach(btn => {
    btn.addEventListener('click', function(){
        delete_product_confirmation_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    });
});


window.addEventListener('click', function(event){
    if(event.target === delete_product_confirmation_modal){
        delete_product_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
})  

// // Page Load
// $(document).ready(function() {
//     $("#transaction_btn").on("click", function(event) {
//         event.preventDefault(); 
//         var pageUrl = "ProductManagement/Transaction.html";
//         $.ajax({
//             url: pageUrl,
//             type: "GET",
//             dataType: "html",
//             success: function(response) {
//                 var newMainContent = $(response).filter("main");
//                 $("main").replaceWith(newMainContent);
//                 document.title = $(response).filter("title").text();
//                 $("script:not(#indexScript)").remove();
//                 var scriptUrl = pageUrl.replace('.html', '.js');
//                 if(scriptUrl != 'Index.js'){
//                     loadScript(scriptUrl);
//                 }   
                
//                 // window.history.replaceState({ path: pageUrl }, '', pageUrl);
//             },
//             error: function(xhr, status, error) {
//                 console.error("Error loading page:", error);
//             }
//         });
//         scrollToTop();
//     });

//     function loadScript(scriptUrl) {
//         console.log("Loading script:", scriptUrl);
//         $.getScript(scriptUrl)
//             .done(function(script, textStatus) {
//                 console.log("Script loaded successfully:", scriptUrl);
//             })
//             .fail(function(jqxhr, settings, exception) {
//                 console.error("Failed to load script:", scriptUrl);
//                 console.error("Error:", exception);
//             });
//     }
// });

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


/////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', loadProduct)

//Thêm mới sản phẩm
document.getElementById("submit").addEventListener('click', addProduct)

// Cập nhật ID sản phẩm tự động
document.getElementById('upload_product_category').addEventListener('change', createID)

// Nút tải ảnh
document.getElementById("upload_product_btn").addEventListener('click', function() {
    JS.loadPic("../product/", document.getElementById("product_id").value, document.getElementById("product_img"));
})

// Lưu thông tin cập nhật
document.getElementById("save_change_product").addEventListener('click', saveChange);

///////////////////////////////////////////////////////////////////////

function loadProduct() {
    JS.connectToPHP("../ProductManagement/product.php","process=load", function(xhr) {
        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < response.length; i++) {
            var product = response[i];
            checkType(product.idProduct, product.nameProduct, product.cost, product.price, product.category, product.img);
        }
    })
}

//Thêm mới sản phẩm
function addProduct() {
    var product_id = document.getElementById("product_id");
    var product_name = document.getElementById("product_name");
    var product_price = document.getElementById("product_price");
    var product_cost = document.getElementById("product_cost");
    var product_type = JS.getSelected("upload_product_category");
    var product_img = document.getElementById("product_img");

    //Kiểm tra dữ liệu đầu vào
    if(!checkinput(product_name, product_price, product_cost)) {return;}
    
    product_id = product_id.value;
    product_name = product_name.value;
    product_price = product_price.value;
    product_cost = product_cost.value;
    product_type = product_type.value;
    product_img = product_img.src.toString();

    //Khởi tạo sản phẩm
    if(createProduct(product_id, product_name, product_cost, product_price, product_type, product_img)) {return;}
    // //Kiểm tra loại
    if(!checkType(product_id, product_name, product_cost, product_price, product_type, product_img) == null) {return}

    document.getElementById("cancel").click();
}

//Cập nhật ID tự động
function createID() {
    var type = JS.getSelected("upload_product_category").value;
    var sign = null;
    if(type === "iPhone")       {sign = "IP"}
    if(type === "iPad")         {sign = "ID"}
    if(type === "Macbook")      {sign = "MA"}
    if(type === "Apple Watch")  {sign = "AW"}
    if(type === "Apple Vision") {sign = "AV"}
    if(type === "AirPods")      {sign = "AP"}
    if(type === "AirTag")       {sign = "AT"}
    var data =  "type=" + sign + "&process=createID"
    
    JS.connectToPHP("../ProductManagement/product.php",data, function(xhr) {
        document.getElementById("product_id").value = JSON.parse(xhr.responseText);
    })
}

function checkinput(product_name, product_price, product_cost) {
    if(JS.checkEmpty(product_name)) {
        alert("Không để trống tên sản phẩm");
        product_name.focus();
        return false;
    }

    if(product_cost < 0) {
        alert("Giá gốc sản phẩm không hợp lệ");
        product_cost.focus();
        return false;
    }

    if(product_price < 0) {
        alert("Giá gốc sản phẩm không hợp lệ");
        product_cost.focus();
        return false;
    }

    return true;
}


// Tạo sản phẩm và lưu vào SQL
function createProduct(product_id, product_name, product_cost, product_price, product_type, product_img) {
    var path =  "../ProductManagement/product.php"
    var data =  "id=" + product_id + 
                "&name=" + product_name +
                "&cost=" + product_cost +
                "&price=" + product_price +
                "&type=" + product_type +
                "&img=" + product_img +
                "&process=add";

    // Lưu vào SQL
    JS.connectToPHP(path, data, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        alert(response[1]);
        return(response[0]);
    })

    return false;
}


function checkType(id, name, cost, price, type, img) {
switch(type) {
    case "iPhone":
        createItem(id, name, cost, price, type, img, document.getElementById("containIphone"));
        break;
    case "iPad":
        createItem(id, name, cost, price, type, img, document.getElementById("containIpad"));
        break;
    case "Macbook":
        createItem(id, name, cost, price, type, img, document.getElementById("containMacbook"));
        break;
    case "Apple Watch":
        createItem(id, name, cost, price, type, img, document.getElementById("containWatch"));
        break;
    case "Apple Vision":
        createItem(id, name, cost, price, type, img, document.getElementById("containVision"));
        break;
    case "AirPods":
        createItem(id, name, cost, price, type, img, document.getElementById("containAirtag"));
        break;
    case "AirTag":
        createItem(id, name, cost, price, type, img, document.getElementById("containAirtag"));
        break;
    default:
        console.log(id)
        alert("Thông tìm thấy mục tương ứng");
        return null;
    }
}


function createItem(id, name, cost, price, type, img, box) {   
    // Tạo một div mới
    var newItem = document.createElement('div');
    newItem.classList.add('product_box', 'contain2');
    newItem.id = "box_" + id;

    //Mã hóa
    cost = btoa(cost)
    price = btoa(price)

    // Tạo nội dung của phần tử
    newItem.innerHTML = `
        <div class="product_name" id="product_name_${id}">${name}</div>
        <img src="${img}" alt="">
        <div class="number_code">${atob(price)}</div>
        <div class="product_detail">
            <div class="product_code manager">
                <img id="barcode-${id}" class="barcode" src="" alt="">
            </div>
            <div class="product_edit_delete manager">
            <button id="btn_edit_${id}" class="product_edit" data-id="${id}" data-name="${name}" data-cost="${cost}" data-price="${price}" data-type="${type}" data-img="${img}">Sửa</button>
            <button id="btn_delete_${id}" class="product_delete" data-id="${id}">Xóa</button>
            </div>
        </div>
    `;
    // Chèn phần tử mới vào phần tử cha đã được xác định
    box.appendChild(newItem);
    JS.connectToPHP("../main/checkSession.php","", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        
        var role = response[1][2];
        if (role == "Quản lý") {
            // Thêm sự kiện nút sửa/xóa
            newItem.querySelector('.product_edit').addEventListener('click', eventClickEdit);
            newItem.querySelector('.product_delete').addEventListener('click', function(event) {
            eventClickDelete(event, newItem);
            });
        }   
    })
    

    // Tạo mã vạch và đặt vào phần tử chứa mã vạch
    createBarcode("123456", "barcode-" + id);
}

function createBarcode(id, barcode) {

    var container = document.getElementById(barcode);

    // Đặt kích thước của phần tử chứa mã vạch
    JsBarcode(container, id, {
        format: "CODE128",
        displayValue: false,
        fontSize: 24,
        textMargin: 10
    });
}

function eventClickEdit(event) {
    document.getElementById("change_product_infor_modal").style.display = 'block';
    document.body.style.overflow = "hidden";
    
    // Lấy các thuộc tính dữ liệu từ nút được nhấn
    document.getElementById("change_product_id").value = event.target.dataset.id;
    document.getElementById("change_product_name").value = event.target.dataset.name;
    document.getElementById("change_product_cost").value = atob(event.target.dataset.cost);
    document.getElementById("change_product_price").value = atob(event.target.dataset.price);
    document.getElementById("change_product_category").value = event.target.dataset.type;
    document.getElementById("change_product_img").src = event.target.dataset.img;
    
}

function eventClickDelete(event, newItem) {
    if (!window.confirm("Bạn có muốn tiếp tục không?")) {return;}

    var data = "id=" + event.target.dataset.id + "&process=delete";

    JS.connectToPHP("../ProductManagement/product.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText)
        alert(response[1]);
        if(response[0]) {
            newItem.remove();
        }
    });
}

function saveChange(event) {
    var id = document.getElementById("change_product_id").value;
    var name = document.getElementById("change_product_name").value;
    var cost = document.getElementById("change_product_cost").value;
    var price = document.getElementById("change_product_price").value;
    var img = document.getElementById("change_product_img_src").src;

    var data =  "id=" + id + 
                "&name=" + name + 
                "&cost=" + cost + 
                "&price=" + price + 
                "&img=" + img + 
                "&process=update";

    JS.connectToPHP("../ProductManagement/product.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText)
        alert(response[1]);
        if(response[0]) {
            document.getElementById("product_name_" + id).textContent = name;
            document.getElementById("btn_edit_" + id).setAttribute('data-name', name);
            document.getElementById("btn_edit_" + id).setAttribute('data-cost', btoa(cost));
            document.getElementById("btn_edit_" + id).setAttribute('data-price', btoa(price));
        }
    });
}

function getIdProduct() {
    JS.connectToPHP("../ProductManagement/product.php","process=loadId", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        if(response[0] == false) {alert[1]}

        var dataList = document.getElementById('product_ids');
        response[1].forEach(function(id) {
            var option = document.createElement('option');
            option.value = id;
            dataList.appendChild(option);
        });
    })

    document.getElementById("input_product_id").addEventListener('input', getNameProduct);
}

function getNameProduct() {
    var id = document.getElementById("input_product_id");
    var name = document.getElementById("input_product_name");

    if(id.value.length != 6) {
        name.value = "";
        return;
    }

    var data =  "id=" + id.value +
                "&process=loadName"
    JS.connectToPHP("../ProductManagement/product.php",data, function(xhr) {
        var response = JSON.parse(xhr.responseText);

        if(response[0] == false) {
            alert(response[1]);
            id.value = "";
            name.value = "";
            return;
        }

        document.getElementById("input_product_name").value = response[1].nameProduct
    })
}

function updateInput() {
    var id = document.getElementById("input_product_id");
    var num = document.getElementById("input_num");
    
    if(JS.checkEmpty(id) || JS.checkEmpty(num)) {
        alert("Không được để trống dữ liệu");
        return;
    }

    if(num.value < 1) {
        alert("Số lượng phải lớn hơn 0")
        return
    }

    var data =  "id=" + id.value +
                "&num=" + num.value +
                "&process=input"
    JS.connectToPHP("../ProductManagement/product.php", data, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        alert(response[1])
        if(response[0] == true) {
            document.getElementById("input_product_id").value = "";
            document.getElementById("input_product_name").value = "";
            document.getElementById("input_num").value = "";
        }
    })
}

function cancelInput() {
    input_product_modal.style.display = 'none';
    document.body.style.overflow = "auto";
    document.getElementById("input_product_id").value = "";
    document.getElementById("input_product_name").value = "";
    document.getElementById("input_num").value = "";
}