function toggleSubnav(targetId) {
    let targetMenu = document.getElementById(targetId);
    if (!targetMenu) {
        console.error(`Không tìm thấy '#${targetId}'`);
        return;
    }

    let isCurrentlyVisible = targetMenu.style.display === "";

    // Ẩn tất cả các subnav khác
    document.querySelectorAll(".container-subnav > .subnav-row").forEach(subnav => {
        subnav.style.display = "none";
    });

    // Toggle trạng thái của menu hiện tại
    targetMenu.style.display = isCurrentlyVisible ? "none" : "";
}
// Ẩn tất cả menu khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".container-subnav > .subnav-row").forEach(subnav => {
        subnav.style.display = "none";
    });
});
