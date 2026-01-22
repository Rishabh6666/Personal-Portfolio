// Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('bx-menu');
    icon.classList.toggle('bx-x');
});

// Close menu when clicking any link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
    });
});

// Close menu when clicking outside (optional improvement)
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
    }
});

// Sticky header + active link + scroll indicator
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Sticky header
    document.querySelector('.header').classList.toggle('sticky', window.scrollY > 100);

    // Scroll indicator fade
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.style.opacity = window.scrollY > window.innerHeight * 0.6 ? '0' : '0.7';
    }

    // Back to top button
    document.querySelector('.back-to-top')?.classList.toggle('visible', window.scrollY > 300);
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ScrollReveal animations
ScrollReveal({ 
    distance: '80px', 
    duration: 2000, 
    delay: 200 
});

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

// Skills Modal (unchanged)
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
    skillModal.addEventListener('click', e => { 
        if (e.target === skillModal) skillModal.style.display = 'none'; 
    });
    document.addEventListener('keydown', e => { 
        if (e.key === 'Escape') skillModal.style.display = 'none'; 
    });
});
