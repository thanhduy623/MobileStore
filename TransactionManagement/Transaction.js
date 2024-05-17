// Delete Transaction Confirmation
var delete_transaction_btn = document.querySelectorAll('.delete_transaction_btn');
var delete_transaction_confirmation_modal = document.getElementById('delete_transaction_confirmation_modal');
var cancel_delete_transaction = document.getElementById('cancel_delete_transaction');
delete_transaction_btn.forEach(btn => {
    btn.addEventListener('click', function(){
        delete_transaction_confirmation_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    });
});

cancel_delete_transaction.addEventListener('click', function(){
    delete_transaction_confirmation_modal.style.display = 'none';
    document.body.style.overflow = "auto";
})

window.addEventListener('click', function(event){
    if(event.target === delete_transaction_confirmation_modal){
        delete_transaction_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
})  

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


// Create Transaction Modal
var create_transaction_btn = document.getElementById('create_transaction_btn');
var create_transaction_modal = document.getElementById('create_transaction_modal');
var cancel_create = document.getElementById('cancel_create');
create_transaction_btn.addEventListener('click', function(){
    create_transaction_modal.style.display = 'block';
    document.body.style.overflow = "hidden";
})
cancel_create.addEventListener('click', function(){
    create_transaction_modal.style.display = 'none';
    document.body.style.overflow = "auto";
})
window.addEventListener('click', function(event){
    if(event.target === create_transaction_modal){
        create_transaction_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
})  


// Transaction Details Modal
var transaction_box = document.getElementsByClassName('transaction_box');
var transaction_details_modal = document.getElementById('transaction_details_modal');
var cancel_details = document.getElementById('cancel_details');

// Convert HTMLCollection to an array
Array.from(transaction_box).forEach(btn => {
    btn.addEventListener('click', function(){
        transaction_details_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    });
});

cancel_details.addEventListener('click', function(){
    transaction_details_modal.style.display = 'none';
    document.body.style.overflow = "auto";
});

window.addEventListener('click', function(event){
    if(event.target === transaction_details_modal){
        transaction_details_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
});
