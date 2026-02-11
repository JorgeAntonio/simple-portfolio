/* ========================================
   Carousel — Init, Navigation & Auto-Scroll
   ======================================== */

/**
 * Initialise dots and scroll-tracking for a carousel.
 * @param {string} id  The wrapper element id (e.g. 'projects-carousel')
 */
function initCarousel(id) {
    const wrapper = document.getElementById(id);
    if (!wrapper) return;
    const track = wrapper.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById(id + '-dots');

    slides.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Ir a slide ' + (i + 1));
        dot.addEventListener('click', function () {
            slides[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
        dotsContainer.appendChild(dot);
    });

    track.addEventListener('scroll', function () {
        const scrollLeft = track.scrollLeft;
        const slideWidth = slides[0].offsetWidth + 12;
        const active = Math.round(scrollLeft / slideWidth);
        dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
            dot.classList.toggle('active', i === active);
        });
    });
}

/**
 * Navigate a carousel by one slide in the given direction.
 * @param {string} id   Carousel wrapper id
 * @param {number} dir  -1 (prev) or 1 (next)
 */
function carouselNav(id, dir) {
    const wrapper = document.getElementById(id);
    const track = wrapper.querySelector('.carousel-track');
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth + 12;
    track.scrollBy({ left: dir * slideWidth, behavior: 'smooth' });
}

/**
 * Enable auto-scrolling for a carousel.
 * Pauses on hover.
 * @param {string} id  Carousel wrapper id
 * @param {number} ms  Interval in milliseconds
 */
function autoScrollCarousel(id, ms) {
    const wrapper = document.getElementById(id);
    if (!wrapper) return;
    const track = wrapper.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    let current = 0;
    let interval;

    function advance() {
        current++;
        if (current >= slides.length) {
            current = 0;
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            const slideWidth = slides[0].offsetWidth + 12;
            track.scrollTo({ left: current * slideWidth, behavior: 'smooth' });
        }
    }

    function start() { interval = setInterval(advance, ms); }
    function stop() { clearInterval(interval); }

    start();
    wrapper.addEventListener('mouseenter', stop);
    wrapper.addEventListener('mouseleave', function () {
        const scrollLeft = track.scrollLeft;
        const slideWidth = slides[0].offsetWidth + 12;
        current = Math.round(scrollLeft / slideWidth);
        start();
    });
}

/* --- Bootstrap carousels --- */
initCarousel('projects-carousel');
initCarousel('content-carousel');

autoScrollCarousel('projects-carousel', 4000);
autoScrollCarousel('content-carousel', 5000);
