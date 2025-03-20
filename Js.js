const toggle_Up = `
<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
     <polyline points="10,30 25,10 40,30" stroke="black" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const toggle_Down = `
<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
     <polyline points="10,20 25,40 40,20" stroke="black" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function toggleArrow(button) {
    let arrow = button.querySelector(".arrow-icon"); // Lấy phần tử span trong nút được nhấn
    if (!arrow) {
        console.error("Không tìm thấy phần tử có class 'arrow-icon'");
        return;
    }

    let isDown = arrow.getAttribute("data-state") === "down"; // Kiểm tra trạng thái hiện tại
    arrow.innerHTML = isDown ? toggle_Up : toggle_Down; // Đổi mũi tên
    arrow.setAttribute("data-state", isDown ? "up" : "down"); // Cập nhật trạng thái
}

// Hiển thị mũi tên mặc định khi trang tải
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".arrow-icon").forEach(arrow => {
        arrow.innerHTML = toggle_Up;
        arrow.setAttribute("data-state", "up"); // Đặt trạng thái ban đầu
    });
});
