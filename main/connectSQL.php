<?php
    function connectDB() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "STORE";
        $conn = mysqli_connect($servername, $username, $password, $database);
    
        // Kiểm tra kết nối
        if (!$conn) {
            echo json_encode([false, "Tài khoản không tồn tại"]);
            die();
        }
    
        return $conn;
    }
?>