export function menuClick() {
    itemClick("home", "../Home/index.html", "main_content");
    itemClick("staff", "../staff/index.html", "main_content");
    itemClick("product", "../ProductManagement/index.html", "main_content");
    itemClick("transaction", "../TransactionManagement/index.html", "main_content");
    itemClick("client", "../CustomerManagement/index.html", "main_content");
    itemClick("report", "../ReportsandStatistics/ReportsandStatistics.html", "main_content");
}

function itemClick(id, link, box) {
    document.getElementById(id).addEventListener("click", function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
        // Sử dụng Fetch API để gửi yêu cầu GET đến trang mới
        fetch(link)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Trả về dữ liệu dạng văn bản của trang mới
            })
            .then(data => {
                // Thay đổi nội dung của thẻ div có id là 'main_content' bằng nội dung của trang mới
                const contentBox = document.getElementById(box);
                if (contentBox) {
                    contentBox.innerHTML = data;

                    // Tìm tất cả các thẻ <script> và thực thi chúng
                    const scripts = contentBox.querySelectorAll("script");
                    scripts.forEach(oldScript => {
                        const newScript = document.createElement("script");
                        newScript.textContent = oldScript.textContent;
                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });
                } else {
                    console.error(`Element with id ${box} not found.`);
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    });
}
