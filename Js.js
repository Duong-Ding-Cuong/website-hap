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


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slide-teammate");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    let isSliding = false;

    function slideNext() {
        // Slide sang phải (phần tử cuối → đầu)
        if (isSliding) return;
        isSliding = true;

        const itemWidth = slider.children[0].offsetWidth + 30;
        const lastItem = slider.lastElementChild;
        slider.insertBefore(lastItem, slider.firstElementChild);
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${itemWidth}px)`;

        // Buộc trình duyệt render lại layout
        void slider.offsetWidth;

        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = "translateX(0)";

        setTimeout(() => {
            isSliding = false;
        }, 500);
    }

    function slidePrev() {
        // Slide sang trái (phần tử đầu → cuối)
        if (isSliding) return;
        isSliding = true;

        const itemWidth = slider.children[0].offsetWidth + 30;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${itemWidth}px)`;

        setTimeout(() => {
            const firstItem = slider.firstElementChild;
            slider.appendChild(firstItem);
            slider.style.transition = "none";
            slider.style.transform = "translateX(0)";
            isSliding = false;
        }, 500);
    }

    nextBtn.addEventListener("click", slideNext);  // chuyển sang phải
    prevBtn.addEventListener("click", slidePrev);  // chuyển sang trái
});




document.addEventListener("DOMContentLoaded", () => {
    const techItems = document.querySelectorAll(".item-list-tech");

    let currentActiveItem = null;
    let currentInterval = null;
    let isSliding = false;

    const stopCurrentSlide = () => {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        }

        if (currentActiveItem) {
            const list = currentActiveItem.querySelector(".list-tech");
            list.style.transition = "none";
            list.style.transform = "translateX(0)";
        }

        isSliding = false;
    };

    const startSliding = (item) => {
        const list = item.querySelector(".list-tech");
        const listItems = list.querySelectorAll(".list-tech-img");

        if (listItems.length <= 8) return;

        stopCurrentSlide();

        const slide = () => {
            if (isSliding) return;
            isSliding = true;

            const itemWidth = list.firstElementChild.offsetWidth + 4;
            const firstItem = list.firstElementChild;
            const cloned = firstItem.cloneNode(true);
            list.appendChild(cloned);

            list.style.transition = "transform 0.5s ease-in-out";
            list.style.transform = `translateX(-${itemWidth}px)`;

            setTimeout(() => {
                list.style.transition = "none";
                list.style.transform = "translateX(0)";
                list.removeChild(firstItem);
                isSliding = false;
            }, 500);
        };

        slide();
        currentInterval = setInterval(slide, 2000);
    };

    techItems.forEach((item) => {
        const list = item.querySelector(".list-tech");
        const listItems = list.querySelectorAll(".list-tech-img");

        item.addEventListener("mouseenter", () => {
            const canSlide = listItems.length > 8;

            if (!canSlide) return;

            // Nếu item mới khác item đang active
            if (currentActiveItem !== item) {
                if (currentActiveItem) {
                    currentActiveItem.classList.remove("active");
                }
                item.classList.add("active");
                currentActiveItem = item;
                startSliding(item);
            }
        });

        // KHÔNG dừng hiệu ứng khi rời chuột
        item.addEventListener("mouseleave", () => {
            // Giữ active và vẫn trượt tiếp
        });
    });

    // ✨ Kích hoạt mặc định phần tử đầu tiên nếu đủ điều kiện
    requestAnimationFrame(() => {
        const firstItem = document.querySelector(".item-list-tech");
        if (!firstItem) return;

        const listItems = firstItem.querySelectorAll(".list-tech-img");
        if (listItems.length > 8) {
            firstItem.classList.add("active");
            currentActiveItem = firstItem;
            startSliding(firstItem);
        }
    });
});







