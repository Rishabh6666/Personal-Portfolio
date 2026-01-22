// ===== MENU TOGGLE =====
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ===== ACTIVE NAVIGATION & STICKY HEADER =====
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document
                    .querySelector('header nav a[href*=' + id + ']')
                    .classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // close menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // close menu after clicking
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ===== SCROLL REVEAL =====
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .education-container, .project-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ===== TYPED JS =====
const typed = new Typed('.multiple-text', {
  strings: [
    'Scalable Web Applications.',
    'Clean Front-End Interfaces.',
    'Reliable Backend Systems.'
  ],
  typeSpeed: 90,
  backSpeed: 45,
  backDelay: 1400,
  loop: true
});



// ===== PROJECT TILT EFFECT =====
document.querySelectorAll('.project-box').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 12;
        const rotateY = ((x / rect.width) - 0.5) * -12;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform =
            'rotateX(0) rotateY(0) scale(1)';
    });
});
