// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.2)';
    } else {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// simple reveal animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .section-header, .about-brief img, .insta-post, .home-blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});


// Initialize Swiper Sliders
document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    // Social Designs Slider (Continuous Marquee)
    if (typeof Swiper !== 'undefined' && document.querySelector('.design-swiper')) {
        const designSwiper = new Swiper('.design-swiper', {
            loop: true,
            speed: 5000,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            slidesPerView: 'auto',
            spaceBetween: 30,
            freeMode: true,
        });
    }

    // Testimonials Slider
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
        const testimonialSwiper = new Swiper('.testimonial-swiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                }
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(faq => faq.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Mobile Bottom Navigation Injection
    initMobileBottomNav();
});

function initMobileBottomNav() {
    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
        <a href="tel:05431977284" class="nav-item">
            <div class="icon-box"><i class="fa-solid fa-phone"></i></div>
            <span>Telefon</span>
        </a>
        <a href="https://www.google.com/maps?ll=37.004555,35.315288&z=16&t=m&hl=en&gl=TR&mapclient=embed&cid=18229253072687221991" target="_blank" class="nav-item">
            <div class="icon-box"><i class="fa-solid fa-location-dot"></i></div>
            <span>Adres</span>
        </a>
        <a href="https://wa.me/905431977284" target="_blank" class="nav-item">
            <div class="icon-box whatsapp"><i class="fa-brands fa-whatsapp"></i></div>
            <span>WhatsApp</span>
        </a>
    `;
    document.body.appendChild(bottomNav);

    const style = document.createElement('style');
    style.innerHTML = `
        .mobile-bottom-nav {
            position: fixed;
            bottom: 15px;
            left: 15px;
            right: 15px;
            height: 65px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            display: none;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 51, 93, 0.2);
            z-index: 10000;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 5px 10px;
            animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .mobile-bottom-nav .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            text-decoration: none;
            flex: 1;
            gap: 2px;
            position: relative;
        }

        .mobile-bottom-nav .icon-box {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: var(--background);
            font-size: 1rem;
            transition: all 0.3s ease;
            color: var(--primary);
        }

        .mobile-bottom-nav .icon-box.whatsapp {
            background: #25D366;
            color: white;
        }

        .mobile-bottom-nav .nav-item span {
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--primary);
        }

        .mobile-bottom-nav .nav-item:active .icon-box {
            transform: scale(0.9);
        }

        @media (max-width: 992px) {
            .mobile-bottom-nav {
                display: flex;
            }
            body {
                padding-bottom: 90px !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// PWA Installation Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const pwaBanner = document.querySelector('.pwa-install-banner');
    if (pwaBanner) pwaBanner.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', () => {
    initPwaInstallation();
});

function initPwaInstallation() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const isDismissed = sessionStorage.getItem('pwaBannerDismissed');

    if (isStandalone || isDismissed) return;

    const pwaBanner = document.createElement('div');
    pwaBanner.className = 'pwa-install-banner';
    pwaBanner.innerHTML = `
        <div class="pwa-content">
            <i class="fa-solid fa-cloud-arrow-down"></i>
            <span>Uygulamamızı Yükleyin</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
            <button class="pwa-install-btn">Yükle</button>
            <button class="pwa-close-btn">&times;</button>
        </div>
    `;
    document.body.appendChild(pwaBanner);

    const logoImg = document.querySelector('header .logo img') || document.querySelector('.footer-col .logo img') || document.querySelector('img[src*="logo"]');
    const logoSrc = logoImg ? logoImg.getAttribute('src') : 'assets/logo.png';

    const iosPopup = document.createElement('div');
    iosPopup.className = 'pwa-ios-popup';
    iosPopup.innerHTML = `
        <div class="ios-popup-content">
            <button class="ios-close">&times;</button>
            <div style="background: #00335d; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; padding: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
                <img src="${logoSrc}" alt="App Icon" style="width: 100%; height: 100%; object-fit: contain; display: block;">
            </div>
            <h3>Uygulamamızı Yükleyin</h3>
            <p>Bu uygulamayı ana ekranınıza eklemek için:</p>
            <ol>
                <li>Tarayıcı altındaki <b>paylaş</b> <i class="fa-solid fa-share-from-square"></i> ikonuna dokunun.</li>
                <li>Açılan menüden <b>Ana Ekrana Ekle</b> <i class="fa-solid fa-plus-square"></i> seçeneğini seçin.</li>
            </ol>
        </div>
    `;
    document.body.appendChild(iosPopup);

    const style = document.createElement('style');
    style.innerHTML = `
        .pwa-install-banner {
            position: fixed;
            bottom: 85px;
            left: 15px;
            right: 15px;
            height: 50px;
            background: var(--primary);
            color: white;
            display: none;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            border-radius: 15px;
            z-index: 10001;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            animation: pwaSlideUp 0.5s ease-out;
        }

        @keyframes pwaSlideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .pwa-content {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .pwa-content i {
            color: var(--secondary);
            font-size: 1.1rem;
        }

        .pwa-install-btn {
            background: var(--secondary);
            color: var(--primary);
            border: none;
            padding: 6px 15px;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.75rem;
            cursor: pointer;
            text-transform: uppercase;
        }

        .pwa-close-btn {
            background: none;
            border: none;
            color: rgba(255,255,255,0.5);
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .pwa-ios-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
            z-index: 10002;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .ios-popup-content {
            background: white;
            padding: 35px 25px;
            border-radius: 25px;
            text-align: center;
            position: relative;
            max-width: 340px;
            color: var(--primary);
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
        }


        .ios-popup-content h3 { font-size: 1.4rem; margin-bottom: 12px; }
        .ios-popup-content p { font-size: 0.95rem; margin-bottom: 20px; opacity: 0.8; }
        .ios-popup-content ol { text-align: left; font-size: 0.9rem; padding-left: 15px; }
        .ios-popup-content li { margin-bottom: 15px; line-height: 1.4; }
        .ios-popup-content b { color: var(--secondary); }

        .ios-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #f0f0f0;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 1.2rem;
            color: #999;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    if (isIOS && !isStandalone) {
        pwaBanner.style.display = 'flex';
    }

    pwaBanner.querySelector('.pwa-install-btn').addEventListener('click', () => {
        if (isIOS) {
            iosPopup.style.display = 'flex';
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    pwaBanner.style.display = 'none';
                    sessionStorage.setItem('pwaBannerDismissed', 'true');
                }
                deferredPrompt = null;
            });
        }
    });

    pwaBanner.querySelector('.pwa-close-btn').addEventListener('click', () => {
        pwaBanner.style.display = 'none';
        sessionStorage.setItem('pwaBannerDismissed', 'true');
    });

    iosPopup.querySelector('.ios-close').addEventListener('click', () => {
        iosPopup.style.display = 'none';
    });
}
