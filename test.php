<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<span id="gender_label">Giới tính</span>
                            <div class="contain1 gender_container">
                                <input type="radio" name="gender" value="male" id="male">
                                <label for="male">Nam</label>
                                <input type="radio" name="gender" value="female" id="female">
                                <label for="female">Nữ</label>
                                <input type="radio" name="gender" value="other" id="other">
                                <label for="other">Khác</label>
                            </div>
                            <button id="btn">s</button>
</body>

<script>
    document.getElementById('btn').addEventListener('click', function() {
        console.log(getRadio('gender').value);
    });


    function getRadio(element) {
    const genderRadios = document.querySelectorAll(`input[name="${element}"]`);
    for (let radio of genderRadios) {
        if (radio.checked) {
            return radio;
        }
    }
    return false;
    }
</script>
</html>