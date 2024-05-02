<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang kích hoạt</title>
</head>
<body>
    <?php
        include './actived_1.php';
        loadPage();
    ?>

    <script>
        import * as JS from '../main/mainJS.js';
        document.getElementById('btnSubmit').addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn không cho form tự động gửi đi
            var password = document.getElementById('MK1').value;
            var confirmPassword = document.getElementById('MK2').value;

            if (password.trim() === "" || confirmPassword.trim() === "") {
                alert("Vui lòng nhập mật khẩu!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Mật khẩu nhập lại không trùng khớp!");
                return;
            }
            
            JS.connectToPHP(path, data, function(xhr) {
                alert("a");
            });

        });
    </script>
</body>
</html>
