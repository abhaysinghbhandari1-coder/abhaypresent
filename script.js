// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ MOBILE MENU ============
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ TYPING EFFECT ============
const roles = ['Student', 'Aspiring Entrepreneur', 'Web Developer', 'Tech Enthusiast'];
const typed = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  typed.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// ============ NUMBER COUNTER ANIMATION ============
function animateCount(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    n += step;
    if (n >= target) {
      n = target;
      clearInterval(timer);
    }
    el.textContent = n + suffix;
  }, 30);
}

// ============ SCROLL REVEAL + SKILL BARS + COUNTERS ============
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('show');

    entry.target.querySelectorAll('.bar i').forEach(bar => {
      bar.style.width = bar.dataset.w + '%';
    });

    entry.target.querySelectorAll('[data-count]').forEach(animateCount);

    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const y = window.scrollY + 120;
  let current = '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop) current = sec.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ============ BACK TO TOP BUTTON ============
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
  setActiveLink();
});
setActiveLink();

// ============ CONTACT FORM (email app khulta hai, backend nahi chahiye) ============
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const body = encodeURIComponent(
    'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
  );

  window.location.href =
    'mailto:abhaysinghbhandari08@mail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;

  document.getElementById('formMsg').textContent =
    'Thanks! Your email app is opening...';
});
