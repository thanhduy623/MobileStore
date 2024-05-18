<?php
    $process =$_POST['process'];
    
    if($process === "loadInformation") {
        //1.Tải thông tin
        loadInformation();
        exit();
    }

    if($process === "deactivate") {
        //2. Khóa tài khoản
        deactivateAccount();
        exit();
    }

    if($process === "updateInformation") {
        //3. Cập nhật thông tin
        updateInformation();
        exit();
    }

    if($process === "changeRoled") {
        //4. Thay đổi phân quyền
        changeRoled();
        exit();
    }

    if($process === "changePWD") {
        //4. Thay đổi phân quyền
        changePWD();
        exit();
    }




    //1.Tải thông tin
    function loadInformation() {
        $username = $_POST['username'];
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


    //2.Khóa tài khoản
    function deactivateAccount() {
        $username = $_POST['username'];
        $actived = $_POST['actived'];

        include '../main/connectSQL.php';
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
        exit();
    }


    //3.Cập nhật thông tin tài khoản
    function updateInformation() {
        $username = $_POST['username'];
        $fullname = $_POST['fullname'];
        $gender = $_POST['gender'];
        $dateBirth = $_POST['dateBirth'];
        $phone = $_POST['phone'];
        $avatar = $_POST['avatar'];
        
        //Cập nhật dữ liệu
        include "../main/connectSQL.php";
        $conn = connectDB();
        $query =   "UPDATE STAFF 
                    SET fullname = ?, gender = ?, dateBirth = ?, phone = ?
                    WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssss", $fullname, $gender, $dateBirth, $phone, $username);
        $stmt->execute();
        
        //Cập nhật ảnh (A)
        replaceAvatar($username, $avatar);

        echo("Cập nhật dữ liệu nhân viên thành công");
        exit();
    }

    
    //A. Cập nhật ảnh
    function replaceAvatar($username, $filePath) {
        //Kiểm tra đường dẫn hình ảnh
        //Nếu chứa "_temp.png" là có sự thay đổi
        //Kiểm tra do link ảnh bị nối phần tên miền
        if(strpos($filePath, "_temp.png"))
        {
            $oldFilePath = '../avatar/' . $username . '_temp.png';
            $newFilePath = '../avatar/' . $username . '.png';
            rename($oldFilePath, $newFilePath);
        }
    }

    //4. Thay đổi phân quyền
    function changeRoled(){
        $username = $_POST['username'];
        $roled = $_POST['roled'];

        include "../main/connectSQL.php";
        $conn = connectDB();
        $query = "UPDATE STAFF SET roled = ? WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $roled, $username);
        $stmt->execute();

        echo("Đã thay đổi phân quyền thành công");
        exit();
    }

    function changePWD() {
        $username = $_POST['username'];
        $pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
        include "../main/connectSQL.php";
        
        $conn = connectDB();
        $query = "UPDATE STAFF SET pwd = ? WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $pwd, $username);
        $stmt->execute();
        echo("Đã đổi mật khẩu thành công");
        exit();
    }
?>