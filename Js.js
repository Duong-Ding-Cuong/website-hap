const toggle_Up = `
<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
     <polyline points="10,30 25,10 40,30" stroke="black" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const toggle_Down = `
<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
     <polyline points="10,20 25,40 40,20" stroke="black" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function toggleArrow(element, targetId) {
    let listItem = element.closest(".main-menu"); // Lấy thẻ li cha
    if (!listItem) return;

    let arrow = listItem.querySelector(".arrow-icon");
    let targetMenu = document.getElementById(targetId);

    if (!arrow || !targetMenu) {
        console.error(`Không tìm thấy '.arrow-icon' hoặc '#${targetId}'`);
        return;
    }

    let isCurrentlyDown = arrow.getAttribute("data-state") === "down";

    // Reset tất cả các menu khác
    document.querySelectorAll(".arrow-icon").forEach(otherArrow => {
        if (otherArrow !== arrow) {
            otherArrow.innerHTML = toggle_Up;
            otherArrow.setAttribute("data-state", "up");
        }
    });

    document.querySelectorAll(".container-subnav > .subnav-row").forEach(subnav => {
        if (subnav !== targetMenu) {
            subnav.style.display = "none";
        }
    });

    // Toggle trạng thái của menu hiện tại
    if (isCurrentlyDown) {
        arrow.innerHTML = toggle_Up;
        arrow.setAttribute("data-state", "up");
        targetMenu.style.display = "none";
    } else {
        arrow.innerHTML = toggle_Down;
        arrow.setAttribute("data-state", "down");
        targetMenu.style.display = "";
    }
}

// Ẩn mặc định tất cả các menu khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".container-subnav > .subnav-row").forEach(subnav => {
        subnav.style.display = "none";
    });

    document.querySelectorAll(".arrow-icon").forEach(arrow => {
        arrow.innerHTML = toggle_Up;
        arrow.setAttribute("data-state", "up");
    });
});
