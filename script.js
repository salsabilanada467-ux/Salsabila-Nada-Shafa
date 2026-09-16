/**
 * Portfolio Website Logic - Salsabila Nada Shafa (Salsa)
 * Features: Mobile menu, Sticky Navbar, Scrollspy, Fade-in on scroll, Copy action, Back to top
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar Blur & Shadow on Scroll
  const navbar = document.getElementById('navbar');
  const handleScrollNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollNavbar, { passive: true });
  handleScrollNavbar();

  // 3. Mobile Navigation Drawer Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Scrollspy (Active navigation highlight on scroll)
  const sections = document.querySelectorAll('section[id]');
  const handleScrollspy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', handleScrollspy, { passive: true });
  handleScrollspy();

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // 6. Copy Placeholder Slot / Toast Notification
  const toast = document.getElementById('toast');
  const copyButtons = document.querySelectorAll('.copy-slot-btn');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy') || btn.getAttribute('data-slot');
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Berhasil disalin: ${copyVal}`);
        }).catch(() => {
          showToast(`Info: ${copyVal}`);
        });
      }
    });
  });

  // 7. Micro-interactions: Animate Skill Bars when scrolled into view
  const skillCards = document.querySelectorAll('.skill-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    skillCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(card);
    });

    // Also observe timeline and interest cards
    const elementsToReveal = document.querySelectorAll(
      '.interest-card, .timeline-card, .education-card, .project-card, .profile-item-card'
    );
    elementsToReveal.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
});
