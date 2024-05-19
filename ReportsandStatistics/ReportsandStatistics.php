<?php
    include "../main/connectSQL.php";
    $process = $_POST['process'];

    if($process === "getBillDetails") {
        getBillDetails();
    }

    if($process === "getBillDetailsTime") {
        getBillDetailsTime();
    }

    function getBillDetails() {
        try {
            $conn = connectDB();
            $query = "CALL GetBillDetails()";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            

            $list = [];
            while ($row = $result->fetch_assoc()) {
                $list[] = $row;
            }

            echo json_encode([true, $list]);
            exit();
        } catch (Exception $e) {
            echo json_encode([false, "Lỗi khi gọi stored procedure: " . $e->getMessage()]);
            exit();
        }
    }

    function getBillDetailsTime(){
        try {
            $conn = connectDB();
            $query = "CALL GetBillDetailsTime(?, ?)";
            $stmt = $conn->prepare($query);
    

            $stmt->bind_param("ss", $_POST['date1'], $_POST['date2']);
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Trả kết quả vào một mảng
            $list = [];
            while ($row = $result->fetch_assoc()) {
                $list[] = $row;
            }
        
            echo json_encode([true, $list]);
            exit();
        } catch (Exception $e) {
            // Debug thông tin lỗi
            error_log("Error: " . $e->getMessage());
    
            echo json_encode([false, "Lỗi khi gọi stored procedure: " . $e->getMessage()]);
            exit();
        }
    }
?>