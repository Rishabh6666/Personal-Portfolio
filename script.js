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
ScrollReveal().reveal('.about-image, .education-item', { origin: 'top', interval: 200 });
ScrollReveal().reveal('.projects-grid .project-box', { scale: 0.9, interval: 200 });
ScrollReveal().reveal('.contact form', { origin: 'bottom' });

// Typed.js
new Typed('.typed-text', {
  strings: [
    'Full-Stack Developer',
    'AI & ML Enthusiast',
    'Software Engineer',
    'Problem Solver'
  ],

  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 1200,
  loop: true,
  contentType: 'null'
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


document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navbar.classList.toggle('active');
    
    // Optional: prevent body scroll when menu is open
    document.body.style.overflow = navbar.classList.contains('active') 
      ? 'hidden' 
      : '';
  });

  // Optional: close menu when clicking a link
  navbar?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navbar.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Optional: close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar?.contains(e.target) && !toggle?.contains(e.target)) {
      toggle?.classList.remove('active');
      navbar?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
