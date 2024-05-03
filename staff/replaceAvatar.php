<?php
    $username = $_POST['username'];

    $directory = '../avatar/'; // Thư mục lưu ảnh
    $fileName = $username . '_temp.png';
    $filePath = $directory . $fileName;

    if (file_exists($filePath)) {
        $newFileName = $username . '.png';
        $newFilePath = $directory . $newFileName;
    
        // Đổi tên tệp tin
        if (rename($filePath, $newFilePath)) {
            echo "Đổi tên tệp tin thành công.";
        } else {
            echo "Đổi tên tệp tin thất bại.";
        }
    } else {
        echo "Tệp tin không tồn tại.";
    }
?>