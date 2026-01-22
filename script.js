// Menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Typed.js
new Typed('.multiple-text', {
    strings: ['Web Apps', 'AI Tools', 'Backend Systems', 'Solutions'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
});

// Active link on scroll (basic version)
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            document.querySelectorAll('.navbar a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
});
