<?php
    include "../main/connectSQL.php";
    $process = $_POST['process'];


    if($process === "createId") {
        createId();
    }

    if($process === "loadCustomer") {
        loadCustomer();
    }

    if($process === "loadProduct") {
        loadProduct();
    }

    if($process === "addCustomer") {
        addCustomer();
    }

    if($process === "addBill") {
        addBill();
    }

    if($process === "loadTransaction") {
        loadTransaction();
    }

    if($process === "loadDetail") {
        loadDetail();
    }
    
    if($process === "detailCus") {
        detail_cus();
    }

    function createId() {
        try {
            $conn = connectDB();
            $query = "SELECT generate_bill_code('" . $_POST['date'] . "')";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            echo json_encode([true, $row["generate_bill_code('" . $_POST['date'] . "')"]]);
            exit();
        }
        catch (Exception $e) {
            echo json_encode([false, "Không thể tạo mã ID, vui lòng thử lại sau"]);
            exit();
        }
    }

    function loadCustomer() {
        try {
            $conn = connectDB();
            $query = "SELECT * FROM CUSTOMER WHERE phone = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $_POST['phone']);
            $stmt->execute();
            $result = $stmt->get_result();

            //Kiểm tra có kế quả hay không
            if($result->num_rows == 0) {
                echo json_encode([false, "Khách hàng chưa tồn tại"]);
                exit();
            }

            echo json_encode([true, $result->fetch_assoc()]);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Lấy dữ liệu khách hàng thất bại"]);
            exit();
        }
    }

    function loadProduct() {
        try {
            $conn = connectDB();
            $query = "SELECT * FROM PRODUCT WHERE idProduct = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $_POST['id']);
            $stmt->execute();
            $result = $stmt->get_result();

            //Kiểm tra có kế quả hay không
            if($result->num_rows == 0) {
                echo json_encode([false, "Sản phẩm không tồn tại"]);
                exit();
            }
            echo json_encode([true, $result->fetch_assoc()]);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Lấy dữ liệu sản phẩm thất bại"]);
            exit();
        }
    }

    function addCustomer() {
        
    }


    function addBill() {
        $conn = connectDB();

        // Thêm khách hàng
        try {
            $conn = connectDB();
            $query = "INSERT INTO CUSTOMER (fullName, address, phone) values  (?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sss", $_POST['name'], $_POST['address'], $_POST['phone']);
            $stmt->execute();

        } catch (Exception $e) {}

        // Thêm hóa đơn
        try {
            $query = "INSERT INTO BILL (idBill, fullname, address, phone, created, total) values  (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sssssd", $_POST['idBill'], $_POST['name'], $_POST['address'], $_POST['phone'], $_POST['created'], $_POST['total']);
            $stmt->execute();
        
        } catch (Exception $e) {
            echo json_encode([false, "Thêm giao dịch thất bại"]);
            exit();
        }



        try {
            $query = "INSERT INTO DETAIL(idBill, idProduct, quantity) values  (?, ?, ?)";
            $stmt = $conn->prepare($query);

            // Duyệt qua các sản phẩm
            $productInfoArray = json_decode($_POST['detail'], true);
            foreach ($productInfoArray as $productInfo) {
                $stmt->bind_param("ssi", $_POST['idBill'], $productInfo[0], $productInfo[1]);
                $stmt->execute();
            }
            
        } catch (Exception $e) {
            echo json_encode([false, "Thêm giao dịch thất bại"]);
            exit();
        }

        try {
            $query = "UPDATE PRODUCT SET selled = selled + ?, remain = remain - ? WHERE idProduct = ?";
            $stmt = $conn->prepare($query);

            // Duyệt qua các sản phẩm
            $productInfoArray = json_decode($_POST['detail'], true);
            foreach ($productInfoArray as $productInfo) {
                $stmt->bind_param("iis", $productInfo[1], $productInfo[1], $productInfo[0]);
                $stmt->execute();
            }
            
        } catch (Exception $e) {
            echo json_encode([false, "Thêm giao dịch thất bại"]);
            exit();
        }


        echo json_encode([true, "Thêm giao dịch thành công"]);
    }

    function loadTransaction() {
        try {
            $conn = connectDB();
            $query = "SELECT * FROM BILL";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();

            //Kiểm tra có kế quả hay không
            if($result->num_rows == 0) {
                echo json_encode([false, "Chưa tồn tại giao dịch nào"]);
                exit();
            }
            
            $results = array();
            while ($row = $result->fetch_assoc()) {
                $results[] = $row;
            }
            echo json_encode($results);
            exit();

        } catch (Exception $e) {
            echo json_encode([false, "Lấy dữ liệu giao dịch thất bại"]);
            exit();
        }
    }

    function loadDetail() {
        try {
            $conn = connectDB();
            $query = "SELECT d.idProduct, p.nameProduct, d.quantity, p.price 
                      FROM DETAIL d 
                      INNER JOIN PRODUCT p ON d.idProduct = p.idProduct 
                      WHERE d.idBill = ?";;
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $_POST['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $results = array();
            while ($row = $result->fetch_assoc()) {
                $results[] = $row;
            }
            
            echo json_encode($results);
            exit();
        
        } catch (Exception $e) {
            echo json_encode([false, "Lấy dữ liệu giao dịch thất bại"]);
            exit();
        }
    }

    function detail_cus() {

        $conn = connectDB();
        $query = "SELECT b.idBill, b.fullname, b.address, b.phone, b.created, b.total,
                d.idProduct, d.quantity
                FROM BILL b
                JOIN DETAIL d ON b.idBill = d.idBill
                WHERE b.idBill = ?";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $_POST['id']);
        $stmt->execute();
        $result = $stmt->get_result();

        // Tạo mảng để lưu trữ kết quả
        $billDetails = array();
        while ($row = $result->fetch_assoc()) {
            $billDetails[] = $row;
        }

        echo json_encode($billDetails);
    }
?>