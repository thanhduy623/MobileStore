<?php
    $scr = $_POST['scr'] . ".png";
    $imageData = $_POST['image'];
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);
    $decodedImageData = base64_decode($imageData);
    file_put_contents($scr, $decodedImageData);
    echo $scr;
?>