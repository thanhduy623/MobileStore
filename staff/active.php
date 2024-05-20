<?php
    include "../main/connectSQL.php";
    $process = $_POST['process'];

    if($process === "active0") {
        active0();
    }

    if($process === "active1") {
        active1();
    }


    function active0() {
        try {
            $actived = 0;
            $conn = connectDB();

            $query = "UPDATE STAFF SET actived = ? WHERE username = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("is", $actived, $_POST['username']);
            $stmt->execute();
            echo json_encode([true, "Vui lòng thực hiện đổi mật khẩu để có thể sửa dụng hệ thống"]);
            exit();
        } catch (Exception $e) {
            echo json_encode([false, "Lỗi hệ thống, vui lòng liên hệ quản trị viên"]);
            exit();
        }
    }

    function active1() {
        try {
            $actived = 0;
            $username = $_POST['username'];
            $pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
            
            $conn = connectDB();
            $query = "UPDATE STAFF SET actived = ?, pwd = ? WHERE username = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("iss", $actived, $pwd, $username);
            $stmt->execute();         

            echo json_encode([true, "Bạn đã có thể sử dụng hệ thống"]);
            exit();
            
        } catch (Exception $e) {
            echo json_encode([false, "Lỗi hệ thống, vui lòng liên hệ quản trị viên"]);
            exit();
        }
    }
?>