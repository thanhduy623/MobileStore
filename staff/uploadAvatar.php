<?php
    $username = $_POST['username'];
    $imageData = $_POST['image'];
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);

    // Giải mã chuỗi base64 thành dữ liệu nhị phân
    $decodedImageData = base64_decode($imageData);

    // Thiết lập đường dẫn và tên tệp để lưu ảnh
    $directory = '../avatar/'; // Thư mục lưu ảnh
    $fileName = $username . '_temp.png';
    $filePath = $directory . $fileName;

    // Kiểm tra và tạo thư mục nếu nó không tồn tại
    if (!file_exists($directory)) {
        mkdir($directory, 0777, true);
    }

    file_put_contents($filePath, $decodedImageData);

    echo $filePath;
?>