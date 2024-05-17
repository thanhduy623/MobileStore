<?php
    include "../main/connectSQL.php";
    $process = $_POST['process'];

    if($process == "loadCus") {
        loadCus();
    }

    function loadCus() {
        try {
            $conn = connectDB();
            $query = "SELECT * FROM CUSTOMER";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();


            if ($result->num_rows == 0) {
                echo json_encode([false, "Chưa tồn tại khách hàng nào trong hệ thống"]);
                exit();
            }


            $results = array();
            while ($row = $result->fetch_assoc()) {
                $results[] = $row;
            }
            echo json_encode($results);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Lỗi kết nối, không thể tải khách hàng"]);
            exit();
        }
    }
?>