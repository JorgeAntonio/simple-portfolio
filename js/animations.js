/* ========================================
   Animations & UI Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* --- Fade-in-up on scroll (IntersectionObserver) --- */
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(function (el) {
        observer.observe(el);
    });

    /* --- Smooth scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- Tech icon tap feedback --- */
    document.querySelectorAll('.tech-icon').forEach(function (icon) {
        icon.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    /* --- Keyboard navigation detection --- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-nav');
    });
});
