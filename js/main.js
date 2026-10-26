const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxCounter = lightbox.querySelector('.lightbox-counter');
const lightboxClose = lightbox.querySelector('.lightbox-close');
let slides = [];
let current = 0;
let opener = null;
let touchStartX = null;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  const slide = slides[current];
  lightboxImg.src = slide.src;
  lightboxImg.alt = slide.caption;
  lightboxCaption.textContent = slide.caption;
  lightboxCounter.textContent = `${current + 1} / ${slides.length}`;
}

function openLightbox(gallery, cover) {
  slides = [...gallery.querySelectorAll('.gallery-items a')].map((a) => ({
    src: a.getAttribute('href'),
    caption: a.dataset.caption,
  }));
  opener = cover;
  lightbox.classList.toggle('single', slides.length === 1);
  showSlide(0);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (opener) opener.focus();
}

document.querySelectorAll('.gallery').forEach((gallery) => {
  const cover = gallery.querySelector('.gallery-cover');
  cover.addEventListener('click', (event) => {
    event.preventDefault();
    openLightbox(gallery, cover);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showSlide(current - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showSlide(current + 1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (slides.length > 1 && event.key === 'ArrowLeft') showSlide(current - 1);
  if (slides.length > 1 && event.key === 'ArrowRight') showSlide(current + 1);
});

lightbox.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

lightbox.addEventListener('touchend', (event) => {
  if (touchStartX === null || slides.length < 2) return;
  const diff = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 50) showSlide(diff < 0 ? current + 1 : current - 1);
  touchStartX = null;
});
