<?php
    require '../PHPMailer/src/Exception.php';
    require '../PHPMailer/src/OAuthTokenProvider.php';
    require '../PHPMailer/src/PHPMailer.php';
    require '../PHPMailer/src/POP3.php';
    require '../PHPMailer/src/SMTP.php';

    // Sử dụng các lớp của PHPMailer
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\PHPMailer;

    if(isset($_POST['sentAgain'])) {
        // Lấy dữ liệu từ POST request
        $username = $_POST['username'];
        $email = $_POST['email'];
        $name = $_POST['name'];
    
        // Gọi hàm sentMail
        sentMail($username, $email, $name);
        exit;
    }


    function sentMail($username, $email, $name) {
        $mail = new PHPMailer(true);
        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'fourDuStore@gmail.com';
            $mail->Password = 'xaczktksyutwvwiw';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;
        
            //Recipients
            $mail->setFrom('fourDuStore@gmail.com', 'FOUR DU STORE');
            $mail->addAddress($email, $name);
            $expires = time() + 60;
            // Mã hóa thông tin cần bảo mật
            $encryptedUsername = base64_encode($username);
            $encryptedExpires = base64_encode($expires);

            // Tạo liên kết an toàn với các thông tin đã mã hóa
            $activationLink = "http://localhost/MobileStore/staff/active.html?username=$encryptedUsername&expires=$encryptedExpires";
            $content =  "Chào " . $name . ",<br><br>" .
                        "Đây là tin nhắn tự động đến từ Four Du Store!<br><br>" .
                        "Vui lòng chọn vào <a href=\"$activationLink\">đây</a> để kích hoạt tài khoản.";

        
            //Content
            $mail->isHTML(true);
            $mail->Subject = "FOUR DU STORE";
            $mail->Body = $content;


        
            $mail->send();
            echo json_encode([true, "Đã gửi đường liên kết kích hoạt qua email"]);
        } catch (Exception $e) {
            echo json_encode([false, 'Gửi mail không thành công. Mailer Error: ' . $mail->ErrorInfo]);
            exit();
        }
    }
?>
