<?php
    include '../main/connectSQL.php';
    $conn = connectDB();

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
    if(!password_verify($password, $pwd_db)) {
        echo json_encode([false,"Sai mật khẩu"]);
        exit();
    }

    //Bị khóa tài khoản
    if ($actived_db == -1) {
        echo json_encode([false, "Tài khoản của bạn đang bị khóa"]);
        exit();
    }
    
    
    //Tao session
    session_start();
    $_SESSION['username']   = $username_db;
    $_SESSION['fullname']   = $fullname_db;
    $_SESSION['roled']       = $roled_db;
    $_SESSION['img']        = $username_db . ".png";
    $_SESSION['actived']    = $actived_db;
    
    session_write_close();
    echo json_encode([true]);
    exit();
?>