const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
  observer.observe(element);
});

const slides = document.querySelectorAll('.home-slider .slide');
const dots = document.querySelectorAll('.home-slider .dot');
const prevButton = document.querySelector('.home-slider .prev');
const nextButton = document.querySelector('.home-slider .next');

if (slides.length > 0) {
  let activeIndex = 0;
  let sliderTimer;

  const setActiveSlide = (index) => {
    const total = slides.length;
    activeIndex = (index + total) % total;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  };

  const startSlider = () => {
    sliderTimer = setInterval(() => {
      setActiveSlide(activeIndex + 1);
    }, 4500);
  };

  const restartSlider = () => {
    clearInterval(sliderTimer);
    startSlider();
  };

  prevButton?.addEventListener('click', () => {
    setActiveSlide(activeIndex - 1);
    restartSlider();
  });

  nextButton?.addEventListener('click', () => {
    setActiveSlide(activeIndex + 1);
    restartSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setActiveSlide(index);
      restartSlider();
    });
  });

  setActiveSlide(0);
  startSlider();
}
