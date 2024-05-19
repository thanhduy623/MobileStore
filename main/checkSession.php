<?php
    //-1: Ko kích hoạt, bị khóa
    // 0: Đã kích hoạt, chưa đổi mật khẩu
    // 1: Đã kích hoạt, đã đổi mật khẩu (sử dụng bình thường)
    session_start();
    if(isset($_SESSION['username'])) {
        //Kiểm tra ảnh
        $img = $_SESSION['img'];
        if (!(file_exists($img))) {
            $img = "../avatar/admin.png";
        }

        echo json_encode([true,
                            [
                                $_SESSION['username'],
                                $_SESSION['fullname'],
                                $_SESSION['roled'],
                                $img,
                                $_SESSION['actived']
                            ]]);
    }
    else {
        echo json_encode([false, "Phiên đăng nhập đã hết hạn"]);
    }
?>
