// Header scroll effect
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
  particle.style.animationDelay = Math.random() * 20 + 's';
  particle.style.width = (Math.random() * 3 + 1) + 'px';
  particle.style.height = particle.style.width;
  particle.style.background = 'rgba(255, 255, 255, 0.6)';
  particlesContainer.appendChild(particle);
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.servico-card, .depoimento-card, .cta-glass, .glass-large').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Storytelling chapters animation
const chapterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.story-chapter').forEach(el => {
  chapterObserver.observe(el);
});

// Progress bar
const progressBar = document.querySelector('.story-progress__bar');
const storySection = document.querySelector('.sobre-story');

window.addEventListener('scroll', () => {
  if (!progressBar || !storySection) return;

  const storyRect = storySection.getBoundingClientRect();
  const storyHeight = storySection.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrolled = -storyRect.top;
  const totalScroll = storyHeight - windowHeight;
  const progress = Math.min(Math.max(scrolled / totalScroll * 100, 0), 100);

  progressBar.style.height = progress + '%';
});

// Animated counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__num').forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
  let current = 0;
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(eased * target);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});



// Mouse parallax on orbs
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.gradient-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 15;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// Reviews Carousel
const track = document.querySelector('.reviews-track');
const navBtns = document.querySelectorAll('.reviews-nav__btn');
let currentReview = 0;
const totalReviews = navBtns.length;

function goToReview(index) {
  if (!track) return;
  currentReview = index;
  const cardWidth = track.querySelector('.review-modern').offsetWidth + 24;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  navBtns.forEach((btn, i) => btn.classList.toggle('active', i === index));
}

navBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => goToReview(i));
});

// Auto-play carousel
if (totalReviews > 0) {
  setInterval(() => {
    currentReview = (currentReview + 1) % totalReviews;
    goToReview(currentReview);
  }, 5000);
}
