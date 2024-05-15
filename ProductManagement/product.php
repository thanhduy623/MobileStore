<?php
    include "../main/connectSQL.php";
    $process = $_POST['process'];

    if($process === "add") {
        add();
    }



    //Hàm xủ lí theo từng loại nhất định
    function add() {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $cost = $_POST['cost'];
        $price = $_POST['price'];
        $type = $_POST['type'];
        $img = $_POST['img'];

        try {
            $conn = connectDB();
            $query = "INSERT INTO PRODUCT 
                    (idProduct, nameProduct, cost, price, category, img)
                    VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssiiss", $id, $name, $cost, $price, $type, $img);
            $stmt->execute();
            echo json_encode([true, "Tạo dữ thành công"]);
            exit();
        } catch (Exception $e) {
            echo json_encode([false, "Tạo dữ liệu thất bại"]);
            exit();
        }
    }
?>