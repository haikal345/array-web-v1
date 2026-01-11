document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // 2. Simple Contact Form Logic
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            alert(`Terima kasih! Kami akan menghubungi ${input.value} segera.`);
            input.value = '';
        });
    }

    // 3. Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50 
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
            : "none";
    });
});