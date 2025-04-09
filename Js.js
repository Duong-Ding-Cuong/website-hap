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

    let currentActiveItem = null;
    let currentInterval = null;
    let isSliding = false;
    let isDragging = false;
    let autoSlideEnabled = true;
    let dragTimeout;
    let startX = 0;
    let currentX = 0;
    let animationID = 0;
    let lastHoveredItem = null;
    const originalOrderMap = new Map();

    const stopCurrentSlide = () => {
        if (currentInterval) clearInterval(currentInterval);
        currentInterval = null;
        if (currentActiveItem) {
            const list = currentActiveItem.querySelector(".list-tech");
            list.style.transition = "none";
            list.style.transform = "translateX(0)";
            currentActiveItem.classList.remove("active");
            currentActiveItem = null;
        }
        isSliding = false;
    };

    const getTranslateX = (element) => {
        const style = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    };

    const setTranslateX = (element, x) => {
        element.style.transform = `translateX(${x}px)`;
    };

    const restoreOriginalItems = (item) => {
        const list = item.querySelector(".list-tech");
        const original = originalOrderMap.get(item);
        if (!original) return;

        const currentItems = Array.from(list.children);
        const isDifferent = original.some((el, i) => el.dataset.key !== currentItems[i]?.dataset.key);

        if (isDifferent) {
            list.innerHTML = "";
            original.forEach(child => list.appendChild(child.cloneNode(true)));
            list.style.transition = "none";
            setTranslateX(list, 0);
        }
    };

    const normalizePosition = (list, items) => {
        const itemWidth = items[0].offsetWidth + 4;
        const currentTranslate = getTranslateX(list);
        const movedItems = Math.round(-currentTranslate / itemWidth);
        const newTranslate = -movedItems * itemWidth;

        list.style.transition = "transform 0.3s ease-out";
        setTranslateX(list, newTranslate);

        setTimeout(() => {
            list.style.transition = "none";
            for (let i = 0; i < movedItems; i++) {
                const first = list.querySelector(".list-tech-img");
                list.appendChild(first);
            }
            setTranslateX(list, getTranslateX(list) + movedItems * itemWidth);
        }, 300);
    };

    const animate = (list) => {
        setTranslateX(list, currentX);
        if (isDragging) {
            animationID = requestAnimationFrame(() => animate(list));
        }
    };

    const startAutoSlide = (item) => {
        if (!autoSlideEnabled || isDragging || !item) return;

        const list = item.querySelector(".list-tech");
        const items = list.querySelectorAll(".list-tech-img");
        const max = window.innerWidth <= 768 ? 2 : 8;

        if (items.length <= max) {
            stopCurrentSlide();
            return;
        }

        stopCurrentSlide();
        currentActiveItem = item;
        item.classList.add("active");

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

    techItems.forEach((item, index) => {
        const list = item.querySelector(".list-tech");
        const originalItems = Array.from(list.querySelectorAll(".list-tech-img"));

        // Gán key để kiểm tra thứ tự sau này
        originalItems.forEach((el, i) => el.dataset.key = `${index}-${i}`);
        originalOrderMap.set(item, originalItems.map(el => el.cloneNode(true)));

        const max = window.innerWidth <= 768 ? 2 : 8;

        if (originalItems.length > max) {
            let isPointerDown = false;

            item.addEventListener("pointerdown", (e) => {
                stopCurrentSlide();
                isDragging = true;
                autoSlideEnabled = false;
                clearTimeout(dragTimeout);
                startX = e.clientX;
                currentX = getTranslateX(list);
                list.style.transition = "none";
                isPointerDown = true;
                animationID = requestAnimationFrame(() => animate(list));
                item.style.cursor = 'grabbing';
            });

            item.addEventListener("pointermove", (e) => {
                if (!isPointerDown) return;
                const delta = e.clientX - startX;
                currentX += delta;
                startX = e.clientX;
            });

            const endDrag = () => {
                if (!isPointerDown) return;
                isDragging = false;
                isPointerDown = false;
                cancelAnimationFrame(animationID);
                normalizePosition(list, originalItems);
                item.style.cursor = 'grab';
                dragTimeout = setTimeout(() => {
                    autoSlideEnabled = true;
                    if (lastHoveredItem) startAutoSlide(lastHoveredItem);
                }, 600);
            };

            item.addEventListener("pointerup", endDrag);
            item.addEventListener("pointerleave", endDrag);
        }

        item.addEventListener("mouseenter", () => {
            lastHoveredItem = item;
            const items = item.querySelectorAll(".list-tech-img");
            const max = window.innerWidth <= 768 ? 2 : 8;
            if (items.length > max && autoSlideEnabled) {
                startAutoSlide(item);
            } else {
                stopCurrentSlide();
            }
        });

        item.addEventListener("mouseleave", () => {
            setTimeout(() => {
                // Kiểm tra nếu không hover item nào
                if (!document.querySelector(":hover")?.closest(".item-list-tech")) {
                    techItems.forEach(restoreOriginalItems);
                    stopCurrentSlide();

                    if (lastHoveredItem && autoSlideEnabled) {
                        startAutoSlide(lastHoveredItem);
                    }
                }
            }, 150); // Delay ngắn tránh cảm giác giật
        });
    });

    // Tự động chạy item đầu nếu phù hợp
    const first = techItems[0];
    if (first) {
        const listItems = first.querySelectorAll(".list-tech-img");
        const max = window.innerWidth <= 768 ? 2 : 8;
        if (listItems.length > max) {
            autoSlideEnabled = true;
            startAutoSlide(first);
            lastHoveredItem = first;
        }
    }
});













