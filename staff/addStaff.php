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
    $pwd = $username;
    $actived = 0;


    //Kiểm tra tài khoản đã tồn tại
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
        echo json_encode([true, "Đã thêm đối tượng thành công"]);
    }

    ini_set("SMTP", "mail.example.com");
    ini_set("smtp_port", "25");

    // Tạo mã token ngẫu nhiên
    $token = bin2hex(random_bytes(16));
    $expiryTime = time() + 60;

    // Tạo đường link kèm token
    $activationLink = "http://localhost/MobileStore/activate.php?username=$username&token=$token&expiry=$expiryTime";

    // Gửi email kèm đường link
    $to = $email;
    $subject = "Kích hoạt tài khoản của bạn";
    $message = "Nhấp vào đường link sau để kích hoạt tài khoản của bạn: $activationLink";
    $headers = "From: your@example.com";

    // Gửi email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email đã được gửi thành công!";
    } else {
        echo "Không thể gửi email. Vui lòng thử lại sau.";
    }
?>