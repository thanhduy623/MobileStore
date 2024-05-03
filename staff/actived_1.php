<?php
    function loadPage() {
        // Lấy tham số từ URL
        $username = json_encode($_GET['username']);
        $expires = json_encode($_GET['expires']);

        // Kiểm tra thời gian hết hạn
        $currentTime = time();
        $linkExpirationTime = $expires;
        if ($currentTime > $linkExpirationTime) {
            echo 
            '
                <h1>Đã hết hạn thời gian kích hoạt tài khoản, vui lòng liên hệ quản trị viên</h1>
            ';
        } else {
            include "../main/connectSQL.php";
            $conn = connectDB();
            $query = "UPDATE STAFF SET actived = 0 WHERE username = ?";
            
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $username);
            if ($stmt->execute()) {
                echo 
                '
                    <h1>VUI LÒNG ĐỔI MẬT KHẨU</h1>
                    <label for="MK1">Đặt lại mật khẩu</label>
                    <input type="password" id="MK1">
                    <label for="MK2">Nhập lại mật khẩu</label>
                    <input type="password" id="MK2">
                    <button type="submit" id="btnSubmit">XÁC NHẬN</button>
                ';
            } else {
                echo 
                '
                    <h1>Lỗi hệ thống và cơ sở dữ liệu vui lòng viên hệ quản trị viên</h1>
                ';
            }

            $stmt->close();
            $conn->close();
        }
    }
?>