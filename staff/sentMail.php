<?php
    require '../PHPMailer/src/Exception.php';
    require '../PHPMailer/src/OAuthTokenProvider.php';
    require '../PHPMailer/src/PHPMailer.php';
    require '../PHPMailer/src/POP3.php';
    require '../PHPMailer/src/SMTP.php';

    // Sử dụng các lớp của PHPMailer
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\PHPMailer;


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
            $username = json_decode($username);
            $expires = json_decode($expires);
            $activationLink = "http://localhost/MobileStore/staff/actived_0.php?username=$username&expires=$expires";

        
            //Content
            $mail->isHTML(true);
            $mail->Subject = 'Here is the subject';
            $mail->Body    = "
                            Chào $username,\n \n
                            Chúc mừng bạn đã trở thành thành viên của Four Du Store!\n \n
                            Vui lòng chọn vào <a href=\"$activationLink\">đây</a> để kích hoạt tài khoản.
                            ";

        
            $mail->send();
            echo json_encode([true, "Đã gửi đường liên kết kích hoạt qua email"]);
        } catch (Exception $e) {
            echo json_encode([false, 'Gửi mail không thành công. Mailer Error: ' . $mail->ErrorInfo]);
            exit();
        }
    }
?>
