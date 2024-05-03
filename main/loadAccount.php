<?php
    session_start();

    $fullname = $_SESSION['fullname'];
    $roled = $_SESSION['roled'];
    $img= $_SESSION['img'];

    echo json_encode([$fullname, $roled, $img]);
?>