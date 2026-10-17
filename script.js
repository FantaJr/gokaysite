document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    function setMenu(open) {
        navLinks.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('menu-open', open);
    }
    hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1024) setMenu(false); });

    // --- Smooth Scroll for Internal Links (offset for sticky header) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = targetId.length > 1 && document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        });
    });

    // --- Scroll Animations ---
    const sections = document.querySelectorAll('.section');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduceMotion) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => {
            section.classList.add('fade-up');
            observer.observe(section);
        });
    }
});
