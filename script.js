// Menu Toggle - improved version
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // prevent bubbling issues
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

    // Close menu when clicking outside (better mobile experience)
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('bx-menu');
            icon.classList.remove('bx-x');
        }
    });
}

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
    if (menuToggle) {
        menuToggle.querySelector('i').classList.remove('bx-x');
    }
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
// Smooth Scrolling
document.querySelectorAll('.navbar a, .back-to-top').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Scroll Reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content', { origin: 'left', interval: 200 });
ScrollReveal().reveal('.home-image', { origin: 'right' });
ScrollReveal().reveal('.about-content, .skills-grid .skill-category', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.about-image, .education-item, .experience-item', { origin: 'top', interval: 200 });
ScrollReveal().reveal('.projects-grid .project-box', { scale: 0.9, interval: 200 });
ScrollReveal().reveal('.contact form', { origin: 'bottom' });
ScrollReveal().reveal('.timeline-item', { origin: 'bottom', interval: 200 });
// Typed.js
new Typed('.typed-text', {
    strings: ['Full-Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Innovator'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1200,
    loop: true
});
// Project card tilt effect
document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y / rect.height - 0.5) * 12;
        const rotateY = (x / rect.width - 0.5) * -12;
        box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
// Contact Form
const form = document.querySelector('.contact form');
const messageEl = document.getElementById('form-message');
form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            messageEl.textContent = 'Message sent successfully!';
            messageEl.style.color = 'limegreen';
            form.reset();
            setTimeout(() => messageEl.textContent = '', 5000);
        } else {
            throw new Error('Failed');
        }
    } catch (err) {
        messageEl.textContent = 'Failed to send. Please try again.';
        messageEl.style.color = 'red';
    }
});

// Skills Modal Functionality
const skillButtons = document.querySelectorAll('.skill-btn');
const skillModal = document.getElementById('skillModal');
const modalTitle = document.getElementById('modalTitle');
const modalSkillsList = document.getElementById('modalSkillsList');
const modalClose = document.getElementById('modalClose');

// Skills data (exactly from your CV)
const skillsData = {
    programming: {
        title: "Programming Languages",
        skills: ["Python", "JavaScript", "SQL", "Java", "C/C++"]
    },
    web: {
        title: "Web Technologies",
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "REST APIs"]
    },
    databases: {
        title: "Databases",
        skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"]
    },
    "data-analysis": {
        title: "Data Analysis & Visualization",
        skills: ["Excel", "Pandas", "NumPy", "Matplotlib", "Power BI (basic)"]
    },
    "ml-ai": {
        title: "Machine Learning & AI",
        skills: ["Scikit-learn", "TensorFlow (basic)", "Data Preprocessing", "Feature Engineering", "Sentiment Analysis"]
    },
    tools: {
        title: "Development Tools & Platforms",
        skills: [
            "Git/GitHub", "VS Code", "PyCharm", "IntelliJ",
            "Google Colab", "Jupyter Notebook", "phpMyAdmin", "Adminer"
        ]
    }
};

skillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const data = skillsData[category];

        if (data) {
            modalTitle.textContent = data.title;
            modalSkillsList.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');
            skillModal.style.display = 'flex';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    skillModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === skillModal) {
        skillModal.style.display = 'none';
    }
});

// Close on Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && skillModal.style.display === 'flex') {
        skillModal.style.display = 'none';
    }
});
