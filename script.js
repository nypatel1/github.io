// Simple animation: Fade in sections as you scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = 0;
    section.style.transition = "all 0.6s ease-out";
    section.style.transform = "translateY(20px)";
    observer.observe(section);
});