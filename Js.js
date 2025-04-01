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
