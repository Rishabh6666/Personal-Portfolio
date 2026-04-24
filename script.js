/* ── Mobile menu with overlay ── */
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const menuIcon = menuToggle.querySelector('i');

// Inject overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openNav() {
    navbar.classList.add('active');
    overlay.classList.add('active');
    menuIcon.classList.replace('bx-menu', 'bx-x');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    menuIcon.classList.replace('bx-x', 'bx-menu');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => navbar.classList.contains('active') ? closeNav() : openNav());
overlay.addEventListener('click', closeNav);

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', closeNav);
});

/* ── Sticky header + active nav + back to top ── */
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    backToTop.classList.toggle('visible', y > 400);
    let current = '';
    sections.forEach(sec => { if (y >= sec.offsetTop - 200) current = sec.getAttribute('id'); });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

/* ── Custom cursor ── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (!isTouchDevice && dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function animateCursor() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, .service-card, .work-card, .process-step').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
}

/* ── Hero canvas particle network ── */
const canvas = document.getElementById('heroCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 55;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * (W || 1200),
            y: Math.random() * (H || 800),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(108,99,255,0.7)';
            ctx.fill();
        });
        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108,99,255,${0.18 * (1 - dist / 130)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
}

/* ── Hero word-by-word reveal (DOM-safe) ── */
// Disabled — causes inline-block spans to break headline layout
// const h1 = ...

/* ── Magnetic button ── */
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ── Scroll fade-up observer ── */
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.07}s`;
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.service-card, .work-card, .exp-item, .stack-group, .process-step, .about-img, .about-content, .contact-left, .contact-right'
).forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
});

/* ── Contact form ── */
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = 'Sending… <i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled = true;
        try {
            const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
            if (res.ok) {
                formMsg.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
                formMsg.style.color = '#00d4aa';
                form.reset();
            } else throw new Error();
        } catch {
            formMsg.textContent = '✗ Failed to send. Please email me directly at rishabhedu6@gmail.com';
            formMsg.style.color = '#f87171';
        }
        btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
        btn.disabled = false;
        setTimeout(() => formMsg.textContent = '', 7000);
    });
}
