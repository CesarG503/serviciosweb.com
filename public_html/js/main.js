/**
 * ServiciosWeb Tech - Interactivity & Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const isExpanded = navMenu.classList.contains('show');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.textContent = isExpanded ? '✕' : '☰';
    });
  }

  // 2. Active Link Highlighting based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Dynamic Footer Year
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // 4. Counter Animation for Stats (index.html)
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = `${prefix}${target}${suffix}`;
          clearInterval(interval);
        } else {
          stat.textContent = `${prefix}${count}${suffix}`;
        }
      }, 35);
    });
  }

  // 5. Category Filtering (servicios.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-item');

  if (filterButtons.length > 0 && serviceCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // 6. Accordion FAQ (contacto.html)
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const wasActive = item.classList.contains('active');
          // Close others
          faqItems.forEach(i => i.classList.remove('active'));
          // Toggle current
          if (!wasActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // 7. Contact Form Simulation (contacto.html)
  const contactForm = document.getElementById('techContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nombre')?.value.trim();
      const service = document.getElementById('servicio')?.value;

      formFeedback.innerHTML = `
        <strong>¡Solicitud enviada con éxito!</strong><br>
        Gracias, <b>${name || 'Estimado cliente'}</b>. Nuestro equipo especializado en infraestructura y gestión centralizada revisará su solicitud para <b>${service}</b> y le responderá a la brevedad.
      `;
      formFeedback.className = 'form-feedback success';
      contactForm.reset();

      // Scroll to feedback message smoothly
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});

