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

    function slidePrev() {
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

    nextBtn.addEventListener("click", slideNext);  // chuyển sang trái (đầu → cuối)
    prevBtn.addEventListener("click", slidePrev);  // chuyển sang phải (cuối → đầu)
});

// auto-slide
document.addEventListener("DOMContentLoaded", () => {
    const techItems = document.querySelectorAll(".item-list-tech");
    const max = window.innerWidth <= 768 ? 2 : 8;

    let currentInterval = null;
    let currentItem = null;
    let isSliding = false;
    let isHovering = false;

    const getTranslateX = (el) => {
        const style = window.getComputedStyle(el);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    };

    const setTranslateX = (el, x) => {
        el.style.transform = `translateX(${x}px)`;
    };

    const resetTransform = (el) => {
        el.style.transition = "none";
        el.style.transform = "translateX(0) !important";
    };

    const stopSlide = () => {
        if (currentInterval) clearInterval(currentInterval);
        currentInterval = null;

        if (currentItem) {
            const list = currentItem.querySelector(".list-tech");
            resetTransform(list);
            currentItem.classList.remove("active");
        }

        currentItem = null;
        isSliding = false;
    };

    const startSlide = (item) => {
        const list = item.querySelector(".list-tech");
        const items = list.querySelectorAll(".list-tech-img");

        if (items.length <= max) {
            stopSlide();
            return;
        }

        stopSlide();
        currentItem = item;
        currentItem.classList.add("active");

        const slide = () => {
            if (isSliding) return;
            isSliding = true;

            const itemWidth = items[0].offsetWidth + 4;
            list.style.transition = "transform 0.5s ease-in-out";
            setTranslateX(list, getTranslateX(list) - itemWidth);

            setTimeout(() => {
                list.style.transition = "none";
                const first = list.querySelector(".list-tech-img");
                list.appendChild(first);
                setTranslateX(list, getTranslateX(list) + itemWidth);
                isSliding = false;
            }, 500);
        };

        slide();
        currentInterval = setInterval(slide, 2000);
    };

    // Hover event listeners
    techItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            isHovering = true;
            startSlide(item);
        });

        item.addEventListener("mouseleave", () => {
            isHovering = false;

            setTimeout(() => {
                // Nếu không còn hover vào bất kỳ phần tử nào thì reset
                const isAnyHovered = [...techItems].some(el => el.matches(":hover"));
                if (!isAnyHovered) {
                    stopSlide();
                    // Khởi động lại auto-slide phần tử đầu tiên sau 300ms
                    setTimeout(() => {
                        if (!isHovering) startSlide(techItems[0]);
                    }, 300);
                }
            }, 100);
        });
    });

    // Auto start default on first element
    if (techItems.length > 0) {
        const first = techItems[0];
        const items = first.querySelectorAll(".list-tech-img");
        if (items.length > max) {
            startSlide(first);
        }
    }
});





















