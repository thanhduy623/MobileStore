// Delete account confirmation
document.addEventListener('DOMContentLoaded', function() {
    const delete_account_btn = document.getElementById('delete_account_btn');
    const deactivate_account_btn = document.getElementById('deactivate_account_btn');
    const change_role_btn = document.getElementById('change_role_btn');
    const delete_account_confirmation_modal = document.getElementById('delete_account_confirmation_modal');
    const deactivate_account_confirmation_modal = document.getElementById('deactivate_account_confirmation_modal');
    const change_role_account_confirmation_modal = document.getElementById('change_role_account_confirmation_modal');
    const cancel_delete_account = document.getElementById('cancel_delete_account');
    const cancel_deactivate_account = document.getElementById('cancel_deactivate_account');
    const cancel_change_role_account = document.getElementById('cancel_change_role_account');
    delete_account_btn.addEventListener('click', function(){
        delete_account_confirmation_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    })

    deactivate_account_btn.addEventListener('click', function(){
        deactivate_account_confirmation_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    })

    change_role_btn.addEventListener('click', function(){
        change_role_account_confirmation_modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    })

    cancel_delete_account.addEventListener('click', function(){
        delete_account_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    })

    cancel_deactivate_account.addEventListener("click", function(){
        deactivate_account_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    })

    cancel_change_role_account.addEventListener("click", function(){
        change_role_account_confirmation_modal.style.display = 'none';
        document.body.style.overflow = "auto";
    })

    window.addEventListener('click', function(event){
        if(event.target === delete_account_confirmation_modal){
            delete_account_confirmation_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  

    window.addEventListener('click', function(event){
        if(event.target === deactivate_account_confirmation_modal){
            deactivate_account_confirmation_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  

    window.addEventListener('click', function(event){
        if(event.target === change_role_account_confirmation_modal){
            change_role_account_confirmation_modal.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    })  
})
