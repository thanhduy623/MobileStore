import * as JS from '../main/mainJS.js';

var today = new Date();
var formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
document.getElementById("select_start_day_chart").value = formattedDate;
document.getElementById("select_end_day_chart").value = formattedDate;
getBillDetailsTime(formattedDate, formattedDate)




// AJAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// $(document).ready(function() {
//     $("#view_by_day").on("click", function(event) {
//         event.preventDefault(); 
//         var pageUrl = "ReportsandStatistics/ReportsandStatistics.html";
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
//             },
//             error: function(xhr, status, error) {
//                 console.error("Error loading page:", error);
//             }
//         });
//         scrollToTop();
//     });

//     $("#view_by_month").on("click", function(event) {
//         event.preventDefault(); 
//         var pageUrl = "ReportsandStatistics/ReportsandStatisticsByMonth.html";
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

function OrderDetalsModal(){
    var statistics_box = document.querySelectorAll('.statistics_box');
    var order_details_modal = document.getElementById('order_details_modal');
    var cancel = document.getElementById('cancel');
    statistics_box.forEach(btn => {
        btn.addEventListener('click', function(){
            order_details_modal.style.display = 'block';
            document.body.style.overflow = "hidden";
        });
    });
    cancel.addEventListener('click', function(){
        order_details_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    })
    window.addEventListener('click', function(event){
        if(event.target === order_details_modal){
            order_details_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  
}
OrderDetalsModal();



//////////////////////////////////////////////////////////////////
document.getElementById("select_start_day_chart").addEventListener('change', input)
document.getElementById("select_end_day_chart").addEventListener('change', input)



//////////////////////////////////////////////////////////////////
function input() {
    var date1Element = document.getElementById("select_start_day_chart");
    var date2Element = document.getElementById("select_end_day_chart");

    if (!date1Element.value || !date2Element.value) {
        return;
    }

    var date1 = date1Element.value;
    var date2 = date2Element.value;

    if (date1 > date2) {
        // Swap the dates
        var temp = date1;
        date1 = date2;
        date2 = temp;

        // Update the input elements with swapped values
        date1Element.value = date1;
        date2Element.value = date2;
    }

    getBillDetailsTime(date1, date2)
}



function label(date1, date2) {
    var startDate = new Date(date1);
    var endDate = new Date(date2);

    // Khởi tạo mảng labels
    var labels = [];

    // Vòng lặp qua các ngày từ startDate đến endDate
    while (startDate <= endDate) {
        // Lấy năm, tháng và ngày
        let year = startDate.getFullYear();
        let month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0-11, cần +1
        let day = startDate.getDate().toString().padStart(2, '0');

        // Thêm ngày vào mảng labels với định dạng yyyy-mm-dd
        labels.push(`${year}-${month}-${day}`);

        // Tăng startDate lên 1 ngày
        startDate.setDate(startDate.getDate() + 1);
    }

    return labels;
}

function getBillDetailsTime(date1, date2) {
    var data =  "process=getBillDetailsTime" +
                "&date1=" + date1+
                "&date2=" + date2;  
                
    var docs = null;
    JS.connectToPHP("../ReportsandStatistics/ReportsandStatistics.php",data, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        var dataList = load_create(response[1])
        createCanvas(dataList)
    })
}

function load_create(data) {
    // Xóa dữ liệu ban đầu
    document.querySelectorAll('.statistics_box').forEach(function(element) {
        // Remove the element from the DOM
        element.remove();
    });

    var sum = 0;
    var count = 0;
    var dateList = [];
    var totalList = [];
    var profitList = [];

    for (var i = 0; i < data.length; i++) {
        var order = data[i];

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
        
        dateList.push(order.created)
        totalList.push(order.total)
        profitList.push(order.profit)
    }

    document.getElementById("listBill").textContent = "Danh sách đơn hàng (" + (count + 1) +") - Tổng doanh thu: " + sum

    return [dateList, totalList, profitList]
}

function createCanvas(dataList) {
    var dateList = dataList[0];
    var totalList = dataList[1];
    var profitList = dataList[2];

    var canvas = document.getElementById("total_amount_received_chart");
    var ctx = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var columnGap = 40;
    var columnWidth = (canvasWidth - (columnGap * (totalList.length + 1))) / totalList.length;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < totalList.length; i++) {
        var x = columnGap * (i + 1) + columnWidth * i;

        // Tính tỷ lệ của profitList so với totalList
        var profitRatio = profitList[i] / totalList[i];

        // Tính chiều cao của cột totalList
        var totalHeight = canvasHeight;

        // Tính chiều cao của cột profitList
        var profitHeight = totalHeight * profitRatio;

        // Vẽ cột totalList
        ctx.fillStyle = "rgba(255, 182, 193, 0.7)"; // Màu sắc pastel
        ctx.fillRect(x, canvasHeight - totalHeight, columnWidth, totalHeight);

        // Vẽ cột profitList
        ctx.fillStyle = "rgba(152, 251, 152, 0.7)"; // Màu sắc pastel
        ctx.fillRect(x, canvasHeight - profitHeight, columnWidth, profitHeight);

        // Vẽ nhãn ngày
        ctx.fillStyle = "black";
        ctx.fillText(dateList[i], x + columnWidth / 2, canvasHeight - 10);
    }
}
