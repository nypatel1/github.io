// Page Navigation
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.page-btn');

    pages.forEach(page => {
        page.classList.remove('active');
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(pageName).classList.add('active');
    event.target.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .skill-card, .timeline-item').forEach((el) => {
    el.style.opacity = 0;
    el.style.transition = "all 0.8s ease-out";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
});