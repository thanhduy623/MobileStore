var orderProductLabels = ['2024-05-11', '2024-05-12', '2024-05-13', '2024-05-14', '2024-05-15', '2024-05-16', '2024-05-17'];
var orderProductData = {
    labels: orderProductLabels,
    datasets: [
        {
            label: 'Số lượng đơn hàng',
            data: [15, 20, 13, 18, 17, 16, 21],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Số lượng sản phẩm bán ra',
            data: [30, 35, 28, 40, 37, 33, 45],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }
    ]
};

var number_of_order_and_product_chart = {
    type: 'bar',
    data: orderProductData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

var number_of_order_and_product_chart = new Chart(
    document.getElementById('number_of_order_and_product_chart'),
    number_of_order_and_product_chart
);

// Existing chart configuration
var labels = ['2024-05-11', '2024-05-12', '2024-05-13', '2024-05-14', '2024-05-15', '2024-05-16', '2024-05-17'];
var data = {
    labels: labels,
    datasets: [{
        label: 'Tổng giá tiền (VND)',
        data: [1200000, 1500000, 1300000, 1600000, 1700000, 1400000, 1800000],
        backgroundColor: [
            'rgba(192, 192, 192, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(192, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(192, 192, 192, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
    }]
};

var config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

var total_amount_received_chart = new Chart(
    document.getElementById('total_amount_received_chart'),
    config
);

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