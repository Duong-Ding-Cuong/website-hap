// hiệu ứng nav ẩn/hiện khi scroll
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
// menu mobile
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

// auto-slide cho tech-stack
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


// hiệu ứng chạy số đếm
function animateCount(element, end, duration, suffix = '') {
    let startTime = null;

    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * end);
        element.textContent = current + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(update);
        }
    }

    window.requestAnimationFrame(update);
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}


const counters = document.querySelectorAll('.count-up');
const animatedFlags = new WeakMap();

function checkCountersInView() {
    counters.forEach((counter) => {
        if (!animatedFlags.get(counter) && isInViewport(counter)) {
            const end = parseInt(counter.getAttribute('data-count')) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            animateCount(counter, end, 1300, suffix);
            animatedFlags.set(counter, true);
        }
    });
}

window.addEventListener("scroll", checkCountersInView);
window.addEventListener("load", checkCountersInView);

//Gửi dữ liệu người dùng nhập vào form contact-us
const BOT_TOKEN = '7871114460:AAHOqDvtPrZ-15nRe1n_sCgZi8v0SX-ji5M'; // Token bot
const CHAT_ID = '-4638397308'; // Chat ID Telegram

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Lấy token CAPTCHA v2
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert("Vui lòng xác nhận bạn không phải người máy!");
        return;
    }
    // Lấy dữ liệu từ form
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const otherContact = document.getElementById('other-contact').value.trim();
    const company = document.getElementById('company').value.trim();
    const message = document.getElementById('message').value.trim();
    const countrySelect = document.querySelector('.country_auto');
    const country = countrySelect.options[countrySelect.selectedIndex].value;
    const text = `
📩 <b>Liên hệ mới</b>
👤 Họ tên: <b>${firstName} ${lastName}</b>
🏢 Công ty: <b>${company || 'Không cung cấp'}</b>
📧 Email: <b>${email}</b>
📱 SĐT: <b>${phone || 'Không cung cấp'}</b>
🔗 Liên hệ khác: <b>${otherContact || 'Không cung cấp'}</b>
🌍 Quốc gia: <b>${country}</b>
📝 Tin nhắn:<pre>${message || 'Không có nội dung'}</pre>
`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML'
        })
    })
        .then(response => response.json())
        .then(data => {
            const status = document.getElementById('formStatus');
            if (data.ok) {
                status.innerText = '✅ Submit Complete!';
                status.style.color = 'green';
                document.getElementById('contactForm').reset();
                grecaptcha.reset(); // Reset CAPTCHA sau khi gửi
            } else {
                status.innerText = '❌ Submit Failed!';
                status.style.color = 'red';
            }
        })
        .catch(error => {
            console.error(error);
            const status = document.getElementById('formStatus');
            status.innerText = '⚠️ Error Submit!';
            status.style.color = 'orange';
        });
});

// Hiện nút khi scroll xuống
window.onscroll = function () {
    const btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};
// Scroll lên đầu khi click vào button
document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

