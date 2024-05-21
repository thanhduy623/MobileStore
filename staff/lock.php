<?php
    include "../main/connectSQL.php";

    try {
        $actived = -1;
        $username = $_POST['username'];
        $conn = connectDB();
        
        $query = "UPDATE STAFF SET actived = ? WHERE username = ?;";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('is', $actived, $username);
        $stmt->execute();
        echo json_encode([true, "Khóa tài khoản thành công"]);
        exit();

    } catch (Exception $e) {

        echo json_encode([false, "Lỗi thực hiện hiện chức năng..."]);
    }
?>