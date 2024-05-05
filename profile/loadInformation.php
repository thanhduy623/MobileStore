<?php
    $username = $_POST['username'];
    include "../main/connectSQL.php";

    $conn = connectDB();
    $query = "SELECT * FROM STAFF WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    $row = $result->fetch_assoc();
    $json_data = json_encode($row);

    // Trả về dữ liệu dưới dạng JSON
    echo $json_data;
?>