// Mobile devices menu
const menu = document.querySelector('#menu-icon');
const btnmenu = menu.querySelector('img');
const initialSrc = btnmenu.src;
const navigation = document.querySelector('.navigation');

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

// indicator movement
document.addEventListener("DOMContentLoaded", function() {
    const navigationItems = document.querySelectorAll(".navigation .list");
    const indicator = document.querySelector(".indicator");

    function adjustIndicatorPosition() {
        const windowWidth = window.innerWidth;
        let activeItem = document.querySelector(".navigation .list.active");

        if (activeItem) {
            const index = Array.from(activeItem.parentNode.children).indexOf(activeItem);
            let translateXValue;

            if (windowWidth >= 1280) {
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

// scroll effect
window.addEventListener('scroll', function() {
    const windowWidth = window.innerWidth;
    
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

// remove scroll effect in mobile devices
function removeScrollClass() {
    const windowWidth = window.innerWidth;
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    if (windowWidth < 1080) {
        header.classList.remove('scroll');
        main.classList.remove('scroll');
    }
}
window.addEventListener('resize', removeScrollClass);
document.addEventListener('DOMContentLoaded', removeScrollClass);

// prevent auto scroll 
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu a');

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 
        });
    });
});

// Menu modal
document.addEventListener('DOMContentLoaded', function() {
    const user_modal = document.getElementById('user_modal');
    const basic_info = document.getElementById('basic_info');
    const profile = document.getElementById('profile');
    const account = document.getElementById('account');
    const setting = document.getElementById('setting');
    const help = document.getElementById('help');
    const themes = document.getElementById('themes');
    const logout = document.getElementById('logout');

    const user = document.getElementById('user');
    user.addEventListener('click', function() {
        user_modal.style.display = 'block';
    }); 

    window.addEventListener('click', function(event) {
        if (event.target === user_modal) {
            user_modal.style.display = 'none';
        }
    });
});

// Create sale account modal
document.addEventListener('DOMContentLoaded', function() {
    const create_account_btn = document.getElementById('create_account_btn');
    const create_account_modal = document.getElementById('create_account_modal');
    const cancel = document.getElementById('cancel');
    create_account_btn.addEventListener('click', function(){
        create_account_modal.style.display = 'block';
    })

    cancel.addEventListener('click', function(){
        create_account_modal.style.display = 'none';
    })

    window.addEventListener('click', function(event){
        if(event.target === create_account_modal){
            create_account_modal.style.display = 'none';
        }
    })  
})
