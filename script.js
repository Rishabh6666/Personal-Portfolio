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

// Active Navigation & Sticky Header + Back to Top + Scroll Arrow Fade
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    document.querySelector('.header').classList.toggle('sticky', window.scrollY > 100);

    // Auto-close mobile menu
    menuToggle.querySelector('i').classList.remove('bx-x');
    navbar.classList.remove('active');

    // Back to top
    document.querySelector('.back-to-top').classList.toggle('visible', window.scrollY > 300);

    // Fade scroll indicator when user has scrolled past home
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        if (window.scrollY > window.innerHeight * 0.6) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '0.7';
        }
    }
});

// Scroll & Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (top >= offset && top < offset + height) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });

    document.querySelector('.header').classList.toggle('sticky', window.scrollY > 100);
    document.querySelector('.back-to-top').classList.toggle('visible', window.scrollY > 300);

    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) indicator.style.opacity = window.scrollY > window.innerHeight * 0.6 ? '0' : '0.7';
});

// Smooth Scroll
document.querySelectorAll('.navbar a, .back-to-top').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ScrollReveal
ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content', { origin: 'left' });
ScrollReveal().reveal('.home-image', { origin: 'right' });
ScrollReveal().reveal('.timeline-item, .skill-btn', { origin: 'bottom', interval: 200 });

// Typed.js
new Typed('.typed-text', {
    strings: ['Full-Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Innovator'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1200,
    loop: true
});

// Skills Modal
document.addEventListener('DOMContentLoaded', () => {
    const skillButtons = document.querySelectorAll('.skill-btn');
    const skillModal = document.getElementById('skillModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSkillsList = document.getElementById('modalSkillsList');
    const modalClose = document.getElementById('modalClose');

    const skillsData = {
        programming: { title: "Programming Languages", skills: ["Python", "JavaScript", "SQL", "Java", "C/C++"] },
        web: { title: "Web Technologies", skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "REST APIs"] },
        databases: { title: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
        "data-analysis": { title: "Data Analysis & Visualization", skills: ["Excel", "Pandas", "NumPy", "Matplotlib", "Power BI (basic)"] },
        "ml-ai": { title: "Machine Learning & AI", skills: ["Scikit-learn", "TensorFlow (basic)", "Data Preprocessing", "Feature Engineering", "Sentiment Analysis"] },
        tools: { title: "Development Tools & Platforms", skills: ["Git/GitHub", "VS Code", "PyCharm", "IntelliJ", "Google Colab", "Jupyter Notebook", "phpMyAdmin", "Adminer"] }
    };

    skillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            const data = skillsData[category];
            if (data) {
                modalTitle.textContent = data.title;
                modalSkillsList.innerHTML = data.skills.map(s => `<li>${s}</li>`).join('');
                skillModal.style.display = 'flex';
            }
        });
    });

    modalClose.addEventListener('click', () => skillModal.style.display = 'none');
    skillModal.addEventListener('click', e => { if (e.target === skillModal) skillModal.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') skillModal.style.display = 'none'; });
});
