<?php
    $process =$_POST['process'];
    $username = $_POST['username'];
    
    if($process === "loadInformation") {
        //1.Tải thông tin
        loadInformation($username);
    }

    if($process === "deactivate") {
        //2. Khóa tài khoản
        deactivateAccount($username);
    }




    //1.Tải thông tin
    function loadInformation($username) {
        include "../main/connectSQL.php";

        $conn = connectDB();
        $query = "SELECT * FROM STAFF WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        // Trả về dữ liệu dưới dạng JSON
        echo json_encode($row);
        exit();
    }


    function deactivateAccount($username) {
        include '../main/connectSQL.php'; // Đảm bảo rằng bạn đã bao gồm file connectSQL.php ở đây
        $conn = connectDB();

        $query = "UPDATE STAFF SET actived = ? WHERE username = ?";
        $stmt = $conn->prepare($query);
        if ($stmt) {
            $stmt->bind_param("is", $actived, $username);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                echo "Đã khóa tài khoản thành công";
            } else {
                echo "Lỗi khóa tài khoản, vui lòng thử lại sau...";
            }
            $stmt->close();
        } else {
            echo "Có lỗi xảy ra khi chuẩn bị câu lệnh SQL.";
        }

        $conn->close();
    }
?>