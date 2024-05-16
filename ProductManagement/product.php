<?php
    include "../main/connectSQL.php";
    $process = $_POST['process'];

    if($process === "add") {
        add();
    }

    if($process === "load") {
        load();
    }

    if($process === "createID") {
        createID();
    }


    //Hàm xủ lí theo từng loại nhất định
    function add() {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $cost = $_POST['cost'];
        $price = $_POST['price'];
        $type = $_POST['type'];
        $img = $_POST['img'];

        echo(json_encode([$type]));
        exit();

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


    function load() {
        try {
            $conn = connectDB();
            $query = "SELECT idProduct, nameProduct, cost, price, category, img FROM PRODUCT";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();

            // Kiểm tra xem có kết quả trả về không
            if ($result->num_rows == 0) {
                echo json_encode(["Chưa tồn tại sản phẩm nào trong hệ thống"]);
                exit();
            }

            // Lưu tất cả sản phẩm vào mảng
            $results = array();
            while ($row = $result->fetch_assoc()) {
                $results[] = $row;
            }
            echo json_encode($results);
            exit();

        } catch (Exception $e) {
            echo json_encode(["Lỗi kết nối, không thể tải sản phẩm"]);
            exit();
        }
    }

    //Lấy ID tự động
    function createID() {
        try {
            $conn = connectDB();
            $query = "SELECT generate_product_code('" . $_POST['type'] . "')";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            echo json_encode($row["generate_product_code('" . $_POST['type'] . "')"]);
            exit();
        }
        catch (Exception $e) {
            echo json_encode(["Không thể tạo mã ID, vui lòng thử lại sau"]);
            exit();
        }
    }
?>