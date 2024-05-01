<?php
    function connectDB() {
        $servername = "localhost";
        $username = "root";
        $password = "Abc@123";
        $database = "STORE";
        $conn = mysqli_connect($servername, $username, $password, $database);
    
        // Kiểm tra kết nối
        if (!$conn) {
            die("Kết nối đến cơ sở dữ liệu thất bại: " . mysqli_connect_error());
            return false;
        }
    
        return $conn;
    }
?>