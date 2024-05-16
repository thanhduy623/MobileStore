<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<body>
    <h1>A</h1>
    <svg id="barcode"></svg>

</body>

<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
<script>
    function createBarcode(id, barcode) {
        JsBarcode("#" + barcode, id, {
            format: "CODE128",
            displayValue: true,
            fontSize: 14,
            textMargin: 5
        });
    }

    createBarcode("123456789", "barcode");
</script>
</html>
