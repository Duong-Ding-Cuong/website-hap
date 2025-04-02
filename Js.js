const change = document.getElementById("language");
function  changeLanguage() {
    change.classList.toggle("show");
}
// hiệu ứng nav ẩn/hiện
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Cuộn xuống
        navbar.classList.add('hidden');
    } else {
        // Cuộn lên
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

const showNav = document.getElementById("nav-mobile");
function  showNavmobile() {
    showNav.classList.toggle("show_navmobile");
    document.body.classList.toggle("noscroll");
}
const menuItems = document.querySelectorAll("#nav-mobile ul li ");
// Gán sự kiện click cho từng <li>
menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
        // Tìm thẻ <a> bên trong <li>
        const link = item.querySelector("a");
        if (link) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của <a>

            // Lấy ID của section từ href của <a>
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Cuộn mượt đến section
                targetSection.scrollIntoView({ behavior: "smooth" });
                // Đợi 600ms rồi đóng menu (để không bị giật)
                setTimeout(() => {
                    showNav.classList.remove("show_navmobile");
                    document.body.classList.remove("noscroll");
                }, 600);
            }
        }
    });
});