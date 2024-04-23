<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ĐĂNG NHẬP</title>
    <link rel="stylesheet" href="./login/login.css">
</head>
<body>
    <div id="frame">
        <div>
            <img src="./IMG/avatar.jpg" id="logo">
        </div>
        <form id="formLogin">
            <div class="formLine">
                <input class="input" name="username" id="username" type="text" placeholder="Username" autocomplete="username" required>
                <img class="icon" src="./IMG/user.png" alt="">
            </div>
            <div class="formLine">
                <input class="input" id="password" type="password" placeholder="Password" required>
                <img class="icon" src="./IMG/password.png" alt="">
            </div>
            <div class="formLine">
                <span id="rememberBox">
                    <input id="remember" type="checkbox">
                    <label for="remember">Remember me</label>
                </span>
                <span id="fogotBox">
                    <a href="#">Forgot password</a>
                </span>
            </div>
            <div class="formLine lineSubmit">
                <button id="btnSubmit" type="submit">SUBMIT</button>              
            </div>
            <div class="formLine lineMess">
                <div id="mess"></div>            
            </div>
        </form>
    </div>

    <script type="module" src="./login/login.js"> </script>
    </body>
</html>