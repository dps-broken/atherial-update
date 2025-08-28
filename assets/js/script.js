document.addEventListener('DOMContentLoaded', function () {

    // --- Preloader ---
    const preloader = document.querySelector('.loading-spinner');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- GSAP Animations (if GSAP is loaded) ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        gsap.from(".hero-title", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.5 });
        gsap.from(".hero-subtitle", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.8 });
        gsap.from(".hero-cta", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 1.1 });

        // Staggered Card Animation on Scroll
        gsap.utils.toArray('.card, .feature-card, .process-step').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Animate Section Titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 1
            });
        });
    }

    // --- SwiperJS Testimonials Slider (if Swiper is loaded) ---
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.testimonials-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            grabCursor: true,
        });
    }
    
    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // --- Portfolio Filtering (Isotope) (if Isotope is loaded) ---
    if (typeof Isotope !== 'undefined') {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            const iso = new Isotope(portfolioGrid, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelector('.filter-btn.active').classList.remove('active');
                    btn.classList.add('active');
                    
                    const filterValue = btn.getAttribute('data-filter');
                    iso.arrange({ filter: filterValue });
                });
            });
        }
    }
});