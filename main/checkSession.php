<?php
    //-1: Ko kích hoạt, bị khóa
    // 0: Đã kích hoạt, chưa đổi mật khẩu
    // 1: Đã kích hoạt, đã đổi mật khẩu (sử dụng bình thường)

    session_start();
    if(isset($_SESSION['username'])) {
        if($_SESSION['actived'] == 1) {
            //Đã được kích hoạt vào trang chủ
            echo "staff/";
            exit;
        } 
        else if($_SESSION['actived'] == 0) {
            //Về trang đổi mật khẩu lần đầu
            echo "staff/actived_0.php";
            exit;
        } 
        else {
            //Về trang đăng nhập
            echo "MobileStore";
            exit;
        }
    } else {
        echo "MobileStore";
        exit;
    } 
?>
