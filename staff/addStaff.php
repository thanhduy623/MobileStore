<?php    
    include '../main/connectSQL.php';
    $conn = connectDB();  

    $name = $_POST['name'];
    $email = $_POST['email'];
    $username = strstr($email, '@', true);
    $gender = $_POST['gender'];
    $dateBirth = $_POST['birth'];
    $phone = $_POST['phone'];
    $roled = $_POST['roled'];
    $img = $username . ".png";
    $pwd = password_hash($username, PASSWORD_DEFAULT);
    $actived = -1;


    // Kiểm tra tài khoản đã tồn tại
    $query = "SELECT username FROM STAFF WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode([false, "Tài khoản đã tồn tại"]);
        exit();
    }


    //Thêm tài khoản
    $query = "INSERT INTO STAFF (username, fullname, email, gender, dateBirth, phone, roled, pwd, actived, img) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssssssis", $username, $name, $email, $gender, $dateBirth, $phone, $roled, $pwd, $actived, $img);


    //Kiểm tra tình trạng thêm tài khoản
    if (!($stmt->execute())) {
        echo json_encode([false, "Thêm đối tượng không thành công"]);
    }

    include '../staff/sentMail.php';
    sentMail($username, $email, $name);
?>