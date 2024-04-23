<?php
    // //Khởi tạo
    $servername = "localhost";
    $username = "root";
    $password = "Abc@123";
    $database = "STORE";
    $conn = mysqli_connect($servername, $username, $password, $database);

    if (!$conn) {
        echo '<script>alert("Hệ thống đang gặp sự cố, vui lòng quay lại sau...")</script>';     
        exit();
    }

    //Lay du lieu tu JS
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT username, pwd, actived, fullname, roled  FROM STAFF WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    

    //Tài khoản không tồn tại
    if ($result->num_rows == 0) {
        echo json_encode([false, "Tài khoản không tồn tại"]);
        exit();
    }
    

    //Lấy dữ liệu
    $row = $result->fetch_assoc();
    $username_db = $row['username'];
    $fullname_db = $row['fullname'];
    $actived_db = $row['actived'];
    $roled_db = $row['roled'];
    $pwd_db = $row['pwd'];

    //Kiem tra mật khẩu
    if ($password != $pwd_db) {
        echo json_encode([false,"Sai mật khẩu"]);
        exit();
    }
    

    //Bị khóa tài khoản
    if ($actived_db == 0) {
        echo json_encode([false, "Tài khoản của bạn đã bị khóa"]);
        exit();
    }

    //Tao session
    session_start();
    $_SESSION['username'] = $username_db;
    $_SESSION['fullname'] = $fullname_db;
    $_SESSION['username'] = $roled_db;
    session_write_close();

    echo json_encode([true]);

    exit();
?>


        