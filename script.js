// ===== Page Navigation =====
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    const allPageBtns = document.querySelectorAll('.page-btn');

    pages.forEach(page => page.classList.remove('active'));
    allPageBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageName);
    });

    const target = document.getElementById(pageName);
    if (target) {
        target.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    initRevealAnimations();
}

// ===== Smooth Scroll to Section =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navHeight = document.getElementById('navbar').offsetHeight;
    const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

    window.scrollTo({ top, behavior: 'smooth' });
}

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
}

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 50);
    }

    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }
}, { passive: true });

// ===== Scroll to Top =====
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
        themeIcon.innerHTML = isDark ? '&#9788;' : '&#9790;';
    }
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) { /* ignore */ }
}

(function initTheme() {
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* ignore */ }

    if (savedTheme === 'dark') {
        setTheme(true);
    } else if (savedTheme === 'light') {
        setTheme(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme(true);
    }
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });
}

// ===== Intersection Observer for Reveal Animations =====
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.page.active section, .page.active .project-card, .page.active .skill-card, .page.active .timeline-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Number(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
        el.classList.remove('visible');
        observer.observe(el);
    });
}

// ===== Keyboard Accessibility for Logo =====
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showPage('home');
        }
    });
}

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
});
