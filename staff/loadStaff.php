<?php
    include "../main/connectSQL.php";
    $conn = connectDB();

    $query = "SELECT fullname, email, roled FROM STAFF ORDER BY created DESC;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $listStaff = array();
    while ($row = $result->fetch_assoc()) {
        array_push($listStaff, [$row['fullname'], $row['email'], $row['roled']]);
    }
    echo json_encode($listStaff);
?>