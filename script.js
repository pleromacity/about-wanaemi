// User contact details
const CONTACT = {
    whatsapp: "+2348185150882",
    call: "+2349069669743",
    email: "wanaemiw@gmail.com",
    linkedin: "https://www.linkedin.com/in/wanaemi-watson-1ab530134/",
    github: "https://github.com/pleromacity"
};

/* Canvas background: simple particle system */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() {
    canvas.width = innerWidth; canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
function rand(min, max) { return Math.random() * (max - min) + min }
function initParticles() {
    particles = [];
    const count = Math.round((canvas.width * canvas.height) / 65000);
    for (let i = 0; i < count; i++) {
        particles.push({ x: rand(0, canvas.width), y: rand(0, canvas.height), vx: rand(-0.2, 0.2), vy: rand(-0.2, 0.2), r: rand(0.6, 2.2) })
    }
}
function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(110,231,183,0.08)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(step);
}

function startBG() { resize(); initParticles(); step(); }
startBG();

/* Proximity glow for contact buttons */
const btns = Array.from(document.querySelectorAll('.contact-btn'));
const root = document.documentElement;
window.addEventListener('pointermove', (e) => {
    btns.forEach(b => {
        const r = b.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        const glow = Math.max(0, 120 - d); // glow radius
        b.style.setProperty('--glow', Math.round(glow / 6) + 'px');
        b.style.boxShadow = `0 6px ${Math.min(22, glow / 3)}px rgba(14,165,160,${Math.min(0.6, glow / 200)})`;
        b.style.transform = `scale(${1 + Math.min(0.12, glow / 700)})`;
    })
});

// Contact modal logic
const modal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const contactContent = document.getElementById('contactContent');

function showContact(type) {
    contactContent.innerHTML = '';
    if (type === 'whatsapp') {
        contactContent.innerHTML = `<h3>WhatsApp</h3>
      <p><a href="https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}" target="_blank">Chat on WhatsApp</a></p>
      <p><button data-copy="${CONTACT.whatsapp}">Copy number</button></p>`;
    } else if (type === 'call') {
        contactContent.innerHTML = `<h3>Call</h3>
      <p><a href="tel:${CONTACT.call}">Call ${CONTACT.call}</a></p>
      <p><button data-copy="${CONTACT.call}">Copy number</button></p>`;
    } else if (type === 'email') {
        contactContent.innerHTML = `<h3>Email</h3>
      <p><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
      <p><button data-copy="${CONTACT.email}">Copy email</button></p>`;
    } else if (type === 'linkedin') {
        contactContent.innerHTML = `<h3>LinkedIn</h3>
      <p><a href="${CONTACT.linkedin}" target="_blank">Open LinkedIn profile</a></p>`;
    } else if (type === 'github') {
        contactContent.innerHTML = `<h3>GitHub</h3>
      <p><a href="${CONTACT.github}" target="_blank">Open GitHub</a></p>`;
    }
    modal.classList.remove('hidden');
}

btns.forEach(b => {
    b.addEventListener('click', () => showContact(b.dataset.type));
});
modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

// copy button handler delegated
contactContent.addEventListener('click', (e) => {
    const t = e.target;
    if (t.dataset.copy) {
        navigator.clipboard && navigator.clipboard.writeText(t.dataset.copy).then(() => {
            t.textContent = 'Copied ✓'; setTimeout(() => t.textContent = 'Copy', 1400);
        });
    }
});

// theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
});

// Parallax for hero avatar and gentle card tilt
const avatar = document.querySelector('.avatar');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
window.addEventListener('pointermove', (e) => {
    if (avatar) {
        const r = avatar.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        avatar.style.transform = `translate(${dx * 8}px, ${dy * 6}px) rotate(${dx * 3}deg)`;
    }
    projectCards.forEach(card => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        card.style.transform = `perspective(600px) rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
    });
});

// Reset transforms when pointer leaves
window.addEventListener('pointerleave', () => {
    if (avatar) avatar.style.transform = '';
    projectCards.forEach(c => c.style.transform = '');
});

// Avatar upload handling
const avatarInput = document.getElementById('avatarInput');
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
if (uploadPhotoBtn && avatarInput) {
    uploadPhotoBtn.addEventListener('click', () => avatarInput.click());
    avatarInput.addEventListener('change', (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        if (avatar) avatar.src = url;
    });
}

// Certification badge upload
const badgeInput = document.getElementById('badgeInput');
const badgeUploadBtn = document.getElementById('badgeUploadBtn');
const certList = document.getElementById('certList');
if (badgeUploadBtn && badgeInput && certList) {
    badgeUploadBtn.addEventListener('click', () => badgeInput.click());
    badgeInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        // assign uploaded badges to cert list items in order
        const items = Array.from(certList.querySelectorAll('li'));
        for (let i = 0; i < files.length && i < items.length; i++) {
            const file = files[i];
            const img = document.createElement('img');
            img.className = 'cert-badge';
            img.src = URL.createObjectURL(file);
            items[i].insertBefore(img, items[i].firstChild);
        }
    });

    // add a default AWS badge if available
    const awsLi = certList.querySelector('li[data-key="aws"]');
    if (awsLi) {
        const awsBadge = document.createElement('img');
        awsBadge.className = 'cert-badge';
        awsBadge.src = 'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/images/certification-badges/saa-badge-resized.15f666ec150fa01aed6d1aa00cce4860a862759b.png';
        awsLi.insertBefore(awsBadge, awsLi.firstChild);
    }
}
