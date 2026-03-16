// ── TYPEWRITER ────────────────────────────────────────────────
const phrases = [
  'SQL Database Developer',
  'Database Administrator',
  'MRI Technologist',
  'Nuclear Medicine Technologist',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  if (!tw) return;
  const phrase = phrases[pi];
  if (!deleting) {
    tw.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    tw.textContent = phrase.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 75);
}
type();

// ── NAVBAR scroll shadow & active link ───────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}, { passive: true });

// ── HAMBURGER ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav-links');

function closeMenu() {
  navList.classList.remove('open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', false);
}

hamburger.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

// ── SKILL CARDS animate-in on scroll ─────────────────────────
const skillCards = document.querySelectorAll('.skill-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

skillCards.forEach(card => observer.observe(card));

// ── CONTACT FORM (mailto fallback) ───────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const fname   = document.getElementById('fname').value.trim();
  const lname   = document.getElementById('lname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const body = encodeURIComponent(
    `From: ${fname} ${lname} <${email}>\n\n${message}\n\n---\nSent from www.casey.zip`
  );
  const mailtoLink =
    `mailto:caseyenos97@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailtoLink;

  const note = document.getElementById('form-note');
  note.textContent = 'Opening your email client...';
  setTimeout(() => { note.textContent = ''; }, 4000);
}

// ── SMOOTH-scroll nav links ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
