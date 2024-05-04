<?php
    session_start();

    $fullname = $_SESSION['fullname'];
    $roled = $_SESSION['roled'];
    $img= $_SESSION['img'];

    if (!(file_exists($img))) {
        $img = "../avatar/admin.png";
    }

    echo json_encode([$fullname, $roled, $img]);
?>