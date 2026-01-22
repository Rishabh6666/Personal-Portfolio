// script.js

// Menu Toggle
const menuToggle = document.querySelector('#menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    menuToggle.querySelector('i').classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.querySelector('i').classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Active Navigation & Sticky Header
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            current = id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close menu on scroll
    menuToggle.querySelector('i').classList.remove('bx-x');
    navbar.classList.remove('active');

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    backToTop.classList.toggle('visible', window.scrollY > 300);
});

// Smooth Scrolling
document.querySelectorAll('.navbar a, .back-to-top').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll Reveal
ScrollReveal({
    distance: '100px',
    duration: 2500,
    delay: 300
});

ScrollReveal().reveal('.home-content', { origin: 'left', interval: 200 });
ScrollReveal().reveal('.home-image', { origin: 'right' });
ScrollReveal().reveal('.about-content, .skills-grid .skill-category', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.about-image, .education-item', { origin: 'top', interval: 200 });
ScrollReveal().reveal('.projects-grid .project-box', { scale: 0.85, interval: 200 });
ScrollReveal().reveal('.contact form', { origin: 'bottom' });

// Typed.js
const typed = new Typed('.typed-text', {
    strings: ['Full-Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Innovator'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1200,
    loop: true
});

// Project Hover Tilt
document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * 15;
        const rotateY = ((x / rect.width) - 0.5) * -15;
        box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Contact Form Submission
const form = document.querySelector('.contact form');
const message = document.getElementById('form-message');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            message.textContent = 'Message sent successfully!';
            message.style.color = 'limegreen';
            form.reset();
            setTimeout(() => message.textContent = '', 5000);
        } else {
            message.textContent = 'Failed to send. Please try again.';
            message.style.color = 'red';
        }
    } catch (error) {
        message.textContent = 'Error occurred.';
        message.style.color = 'red';
    }
});
