<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>TRANG KÍCH HOẠT Title</title>
    <!-- Liên kết với file CSS -->
    <link rel="stylesheet" type="text/css" href="../main/style.css">
</head>
<body>

<?php
    function loadPage() {
        $username = base64_decode($_GET['username']);
        $expires = base64_decode($_GET['expires']);

        // Kiểm tra thời gian hết hạn
        $currentTime = time() - 1000000000000000000;
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
                    <link rel="stylesheet" type="text/css" href="../main/style.css">
                    <div class="" id="">
                    <div class="change_product_infor_container">
                        <div class="change_product_infor_header">
                            <p>VUI LÒNG ĐỔI MẬT KHẨU</p>
                        </div>
                        <div class="change_product_infor_content">                    
                            <div>
                                <span>Mật mật khẩu</span>
                                <input type="text" name="change_product_id" id="MK1" list="product_ids">
                                <datalist id="product_ids"></datalist>

                                <span>Nhập lại mật khẩu</span>
                                <input type="text" name="change_product_name" id="MK2" readonly>
                            </div>             
                        </div>
                        <div class="change_product_infor_footer">
                            <div class="contain1 create_cancel">
                                <button class="create" id="btnSubmit">XÁC NHẬN</button>
                            </div>  
                        </div>
                    </div>
                </div>
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
    loadPage();
?>


<script>
    document.addEventListener('DOMContentLoaded', function() {
        var btnSubmit = document.getElementById('btnSubmit');
        btnSubmit.addEventListener('click', function() {
            // alert("A")
        });
    });
</script>

</body>
</html>