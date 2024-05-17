function generateSampleData() {
    var data = [];
    for (let i = 1; i <= 31; i++) {
        data.push(Math.floor(Math.random() * 1000000) + 500000); 
    }
    return data;
}

function generateOrderData() {
    var data = [];
    for (let i = 1; i <= 31; i++) {
        data.push(Math.floor(Math.random() * 100) + 1); 
    }
    return data;
}

function generateProductData() {
    var data = [];
    for (let i = 1; i <= 31; i++) {
        data.push(Math.floor(Math.random() * 500) + 50); 
    }
    return data;
}

function generateLabels(month) {
    var labels = [];
    for (let i = 1; i <= 31; i++) {
        labels.push(`${month}-${i.toString().padStart(2, '0')}`);
    }
    return labels;
}

var currentMonth = '2024-05';
var labels = generateLabels(currentMonth);
var revenueData = generateSampleData();
var orderData = generateOrderData();
var productData = generateProductData();

var revenueChartData = {
    labels: labels,
    datasets: [{
        label: 'Doanh thu (VND)',
        data: revenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

var number_of_order_and_product_chartData = {
    labels: labels,
    datasets: [
        {
            label: 'Số lượng đơn hàng',
            data: orderData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Số lượng sản phẩm',
            data: productData,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }
    ]
};

var revenueConfig = {
    type: 'bar', 
    data: revenueChartData,
    options: {
        indexAxis: 'y',
        plugins: {
            legend: {
                labels: {
                    color: 'red' 
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
};

var orderProductConfig = {
    type: 'bar', 
    data: number_of_order_and_product_chartData,
    options: {
        indexAxis: 'y',
        plugins: {
            legend: {
                labels: {
                    color: 'red' 
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
};

var total_amount_received_chart = new Chart(
    document.getElementById('total_amount_received_chart'),
    revenueConfig
);

var number_of_order_and_product_chart = new Chart(
    document.getElementById('number_of_order_and_product_chart'),
    orderProductConfig
);

// Page Load
$(document).ready(function() {
    $("#view_by_day").on("click", function(event) {
        event.preventDefault(); 
        var pageUrl = "ReportsandStatistics/ReportsandStatistics.html";
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
                
                // window.history.replaceState({ path: pageUrl }, '', pageUrl);
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
                
                // window.history.replaceState({ path: pageUrl }, '', pageUrl);
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
});

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
