// Delete Account Confirmation
function deleteAccountConfirmation(){
    var delete_account_btn = document.querySelectorAll('.delete_account_btn');
    var delete_account_confirmation_modal = document.getElementById('delete_account_confirmation_modal');
    var cancel_delete_account = document.getElementById('cancel_delete_account');
    delete_account_btn.forEach(btn => {
        btn.addEventListener('click', function(){
            delete_account_confirmation_modal.style.display = 'block';
            document.body.style.overflow = "hidden";
        });
    });
    cancel_delete_account.addEventListener('click', function(){
        delete_account_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    })
    window.addEventListener('click', function(event){
        if(event.target === delete_account_confirmation_modal){
            delete_account_confirmation_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  
}
deleteAccountConfirmation();