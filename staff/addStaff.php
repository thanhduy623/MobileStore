<?php    
    include '../main/connectSQL.php';
    $conn = connectDB();  

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $birth = $_POST['birth'];

    if($gender = "Nam") {$gender = 1;} else {$gender = 0;}


    //Tài khoản không tồn tại
    $query = "SELECT username FROM STAFF WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 0) {
        echo json_encode([false, "Tài khoản không tồn tại"]);
        exit();
    }


    //Thêm tài khoản
    $query = "INSERT INTO STAFF VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssss", $name, $phone, $email, $gender, $birth);
    if ($stmt->execute()) {
        echo json_encode([true, "Đã thêm đối tượng thành công"]);
    } else {
        echo json_encode([false, "Lỗi khi thêm đối tượng"]);
    }

?>