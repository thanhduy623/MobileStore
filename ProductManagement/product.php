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

    if($process === "delete") {
        delete();
    }

    if($process === "update") {
        update();
    }

    if($process === "loadId") {
        loadId();
    }

    if($process === "loadName") {
        loadName();
    }
    
    if($process === "input") {
        input();
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

    function delete() {
        $id = $_POST['id'];

        try {
            $conn = connectDB();
            $query = "DELETE FROM PRODUCT WHERE idProduct = '" . $id . "'";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            echo json_encode([true, "Xóa thành công"]);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Không thể xóa sản phẩm, do sản phẩm đã được bán"]);
            exit();
        }
    }

    function update() {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $cost = $_POST['cost'];
        $price = $_POST['price'];
        $img = $_POST['img'];

        try {
            $conn = connectDB();
            $query = "UPDATE PRODUCT SET nameProduct = ?, cost = ?, price = ?, img = ? WHERE idProduct = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("siiss", $name, $cost, $price, $img, $id);
            $stmt->execute();
            echo json_encode([true, "Sửa thành công"]);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Không thể sửa sản phẩm"]);
            exit();
        }
    }

    function loadId() {
        try {
            $conn = connectDB();
            $query = "SELECT idProduct FROM PRODUCT";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();

            $idProducts = [];
            while ($row = $result->fetch_assoc()) {
                $idProducts[] = $row['idProduct'];
            }
            echo json_encode([true, $idProducts]);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Lấy danh sách mã sản phẩm thất bại"]);
            exit();
        }
    }

    function loadName() {
        try {
            $conn = connectDB();
            $query = "SELECT nameProduct FROM PRODUCT where idProduct = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $_POST['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if($result->num_rows == 0) {
                echo json_encode([false, "Mã sản phẩm không đúng"]);
                exit();
            }

            echo json_encode([true, $result->fetch_assoc()]);
            exit();
        } catch (Exception $e) {
            echo json_encode([false, "Tải dữ liệu thất bại, vui lòng thử lại sau"]);
            exit();
        }
    }

    function input() {
        try {
            $conn = connectDB();
            $query = "UPDATE PRODUCT
                      SET entered = entered + ?
                      WHERE idProduct = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("is",$_POST['num'] , $_POST['id']);
            $stmt->execute();

            echo json_encode([true, "Nhập sản phẩm thành công"]);
            exit();
        } catch (Exception $e) {
            echo json_encode([false, "Nhập sản phẩm thất bại"]);
            exit();
        }
    }
?>