import * as JS from '../main/mainJS.js';


// Page Load
$(document).ready(function() {
    $("#view_by_month").on("click", function(event) {
        event.preventDefault(); 
        var pageUrl = "ReportsandStatistics/ReportsandStatisticsByMonth.html";
        $.ajax({
            url: pageUrl,
            type: "GET",
            dataType: "html",
            success: function(response) {
                var newMainContent = $(response).filter("main");
                $("main").replaceWith(newMainContent);
                document.title = $(response).filter("title").text();
                $("script:not(#indexScript)").remove();
                var scriptUrl = pageUrl.replace('.html', '.js');
                if(scriptUrl != 'Index.js'){
                    loadScript(scriptUrl);
                }   
            },
            error: function(xhr, status, error) {
                console.error("Error loading page:", error);
            }
        });
        scrollToTop();
    });

    $("#view_by_specific").on("click", function(event) {
        event.preventDefault(); 
        var pageUrl = "ReportsandStatistics/ReportsandStatisticsBySpecific.html";
        $.ajax({
            url: pageUrl,
            type: "GET",
            dataType: "html",
            success: function(response) {
                var newMainContent = $(response).filter("main");
                $("main").replaceWith(newMainContent);
                document.title = $(response).filter("title").text();
                $("script:not(#indexScript)").remove();
                var scriptUrl = pageUrl.replace('.html', '.js');
                if(scriptUrl != 'Index.js'){
                    loadScript(scriptUrl);
                }   
            },
            error: function(xhr, status, error) {
                console.error("Error loading page:", error);
            }
        });
        scrollToTop();
    });

    function loadScript(scriptUrl) {
        console.log("Loading script:", scriptUrl);
        $.getScript(scriptUrl)
            .done(function(script, textStatus) {
                console.log("Script loaded successfully:", scriptUrl);
            })
            .fail(function(jqxhr, settings, exception) {
                console.error("Failed to load script:", scriptUrl);
                console.error("Error:", exception);
            });
    }

    loadBill();
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function OrderDetalsModal() {
    var statistics_box = document.querySelectorAll('.statistics_box');
    var order_details_modal = document.getElementById('order_details_modal');
    var cancel = document.getElementById('cancel');
    statistics_box.forEach(btn => {
        btn.addEventListener('click', function() {
            order_details_modal.style.display = 'block';
            document.body.style.overflow = "hidden";
        });
    });
    cancel.addEventListener('click', function() {
        order_details_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    });
    window.addEventListener('click', function(event) {
        if (event.target === order_details_modal) {
            order_details_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    });
}
OrderDetalsModal();

function loadBill() {
    JS.connectToPHP("../ReportsandStatistics/ReportsandStatistics.php","process=getBillDetails", function(xhr) {
        var response = JSON.parse(xhr.responseText);
        var orders = response[1];
        var sum = 0; 
        var count = 0;
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            console.log(order)

            var statisticsBox = document.createElement("div");
            statisticsBox.classList.add("statistics_box");

            var idBill = document.createElement("p");
            idBill.id = "b_st_maDH";
            idBill.textContent = order.idBill;

            var quantity = document.createElement("p");
            quantity.id = "b_st_so_luong";
            quantity.textContent = order.item + " | " + order.items;

            var total = document.createElement("p");
            total.id = "b_st_tien_ban";
            total.textContent = order.total;

            var created = document.createElement("p");
            created.id = "b_st_thoigian";
            created.textContent = order.created;

            statisticsBox.appendChild(idBill);
            statisticsBox.appendChild(quantity);
            statisticsBox.appendChild(total);
            statisticsBox.appendChild(created);

            document.getElementById("list").appendChild(statisticsBox);

            sum = sum + Number(order.profit);
            count = i;
        }

        document.getElementById("listBill").textContent = "Danh sách đơn hàng (" + (count + 1) +") - Tổng doanh thu: " + sum

        // Tạo một phần tử div mới
var productItem = document.createElement("div");
productItem.classList.add("product_item", "margin_bottom");

// Tạo các phần tử p bên trong productItem và đặt nội dung cho chúng
var productId = document.createElement("p");
productId.classList.add("product_id");
productId.innerHTML = "<strong>ID sản phẩm:</strong> IP0001";

var quantity = document.createElement("p");
quantity.classList.add("quanity");
quantity.innerHTML = "<strong>Số lượng:</strong> 2";

var price = document.createElement("p");
price.classList.add("price");
price.innerHTML = "<strong>Đơn giá:</strong> 1000000";

var sum = document.createElement("p");
sum.classList.add("sum");
sum.innerHTML = "<strong>Tổng tiền:</strong> 2000000";

// Thêm các phần tử con vào productItem
productItem.appendChild(productId);
productItem.appendChild(quantity);
productItem.appendChild(price);
productItem.appendChild(sum);

// Lấy đối tượng cha và thêm productItem vào nó
var orderDetailsContent = document.querySelector(".order_details_modal_content");
orderDetailsContent.appendChild(productItem);
    })
}