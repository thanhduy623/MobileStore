// Mobile Devices Menu
var menu = document.querySelector('#menu-icon');
var btnmenu = menu.querySelector('img');
var initialSrc = "assets/menu.svg";
var navigation = document.querySelector('.navigation');
let isOpen = false;
menu.addEventListener('click', () => {
    if (isOpen) {
        btnmenu.src = initialSrc; 
    } else {
        btnmenu.src = "assets/close.svg"; 
    }
    isOpen = !isOpen; 
    navigation.classList.toggle('open');
});


// Indicator Movement
document.addEventListener("DOMContentLoaded", function() {
    var navigationItems = document.querySelectorAll(".navigation .list");
    var indicator = document.querySelector(".indicator");
    function adjustIndicatorPosition() {
        var windowWidth = window.innerWidth;
        let activeItem = document.querySelector(".navigation .list.active");
        if (activeItem) {
            var index = Array.from(activeItem.parentNode.children).indexOf(activeItem);
            let translateXValue;
            if (windowWidth > 1280) {
                translateXValue = `translateX(calc(5.32em * ${index}))`;
            } else if (windowWidth >= 1090) {
                translateXValue = `translateX(calc(4.05em * ${index}))`;
            } else {
                translateXValue = `translateX(calc(4.05em * ${index}))`;
            }
            indicator.style.transform = translateXValue;
        }
    }
    adjustIndicatorPosition();
    window.addEventListener("resize", adjustIndicatorPosition);
    navigationItems.forEach(item => {
        item.addEventListener("click", function() {
            navigationItems.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            adjustIndicatorPosition();
        });
    });
});


// Scroll Effect
window.addEventListener('scroll', function() {
    var windowWidth = window.innerWidth;
    if (window.scrollY > 100 && windowWidth >= 1090) { 
        document.querySelector('header').classList.add('scroll');
        document.querySelector('main').classList.add('scroll');
        document.querySelector('.user_modal_content').classList.add('scroll');
    } else {
        document.querySelector('header').classList.remove('scroll');
        document.querySelector('main').classList.remove('scroll');
        document.querySelector('.user_modal_content').classList.remove('scroll');
    }
});


// Remove Scroll Effect In Mobile Devices
function removeScrollClass() {
    var windowWidth = window.innerWidth;
    var header = document.querySelector('header');
    var main = document.querySelector('main');

    if (windowWidth < 1080) {
        header.classList.remove('scroll');
        main.classList.remove('scroll');
    }
}
window.addEventListener('resize', removeScrollClass);
document.addEventListener('DOMContentLoaded', removeScrollClass);


// Prevent Auto Scroll 
document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.menu a');

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 
        });
    });
});


// Menu Modal
document.addEventListener('DOMContentLoaded', function() {
    var user_modal = document.getElementById('user_modal');
    var basic_info = document.getElementById('basic_info');
    var profile = document.getElementById('profile');
    var account = document.getElementById('account');
    var setting = document.getElementById('setting');
    var help = document.getElementById('help');
    var themes = document.getElementById('themes');
    var logout = document.getElementById('logout');
    var user = document.getElementById('user');
    user.addEventListener('click', function() {
        user_modal.style.display = 'block';
        document.querySelector('.user_frame').classList.add('active1');
    }); 
    window.addEventListener('click', function(event) {
        if (event.target === user_modal) {
            user_modal.style.display = 'none';
            document.querySelector('.user_frame').classList.remove('active1');
        }
    });
});


//Page Load
$(document).ready(function() {
    $(document).on("click", ".list a", function(event) {
        event.preventDefault(); 
        var pageUrl = $(this).attr("href");
        $.ajax({
            url: pageUrl,
            type: "GET",
            dataType: "html",
            success: function(response) {
                var newMainContent = $(response).filter("main");
                $("main").replaceWith(newMainContent);
                document.title = $(response).filter("title").text();
                $("script:not(.indexScript)").remove();
                var scriptUrl = pageUrl.replace('.html', '.js');
                if (scriptUrl != 'Index.js') {
                    loadScript(scriptUrl);
                }
                var windowWidth = window.innerWidth;
                if (windowWidth <= 1090) { 
                    btnmenu.src = initialSrc; 
                    navigation.classList.toggle('open');
                }
                // window.history.pushState({ path: pageUrl }, '', pageUrl);
            },
            error: function(xhr, status, error) {
                console.error("Error loading page:", error);
            }
        });
    });

    $(document).on("click", ".user_menu", function(event) {
        event.preventDefault(); 
        var pageUrl = $(this).attr("href");
        $.ajax({
            url: pageUrl,
            type: "GET",
            dataType: "html",
            success: function(response) {
                var newMainContent = $(response).filter("main");
                $("main").replaceWith(newMainContent);
                document.title = $(response).filter("title").text();
                $("script:not(.indexScript)").remove();
                var scriptUrl = pageUrl.replace('.html', '.js');
                if (scriptUrl != 'Index.js') {
                    loadScript(scriptUrl);
                }
                user_modal.style.display = 'none';
                document.querySelector('.user_frame').classList.remove('active1');
            },
            error: function(xhr, status, error) {
                console.error("Error loading page:", error);
            }
        });
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

    $(document).ajaxComplete(function() {
         
    });
});


// Toggle Password
function togglePassword() {
    var passwordContainer = document.getElementById("passwork_container");
    var passwordField = passwordContainer.querySelector('input');
    var btneye = passwordContainer.querySelector('img');
    var initialSrc = "assets/eye-outline.svg";
    if (passwordField.type === "password") {
        passwordField.type = "text";
        btneye.src = initialSrc; 
    } else {
        passwordField.type = "password";
        btneye.src = "assets/eye-off-outline.svg";
    }
}

function togglePasswordModal(eyeIcon, inputId) {
    const passwordField = document.getElementById(inputId);
    const initialSrc = "assets/eye-off-outline.svg";
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.src = "assets/eye-outline.svg"; 
    } else {
      passwordField.type = "password";
      eyeIcon.src = initialSrc;
    }
}  
