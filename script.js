(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const toast = document.getElementById('toast');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });
  }

  let toastTimeout = null;

  function showToast(message, type) {
    if (!toast) return;
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toast.classList.remove('show');
    }
    toast.className = 'toast';
    if (type === 'success') toast.classList.add('success');
    if (type === 'error') toast.classList.add('error');
    toast.textContent = message;
    void toast.offsetWidth;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  const pages = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-menu a[data-page]');

  function navigateTo(pageId) {
    // hide all pages
    pages.forEach((p) => p.classList.remove('active'));
    // show target
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
    // update nav active
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });
    // close mobile menu
    if (navMenu) navMenu.classList.remove('open');
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Jika ada elemen dengan data-page dan pages tersedia, berarti ini index.html
  if (pages.length > 0 && navLinks.length > 0) {
    // Set default ke home jika tidak ada hash
    if (!window.location.hash) {
      navigateTo('home');
    } else {
      // Ambil hash tanpa #
      const hash = window.location.hash.substring(1);
      if (hash) navigateTo(hash);
    }

    // Event listener untuk link internal
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) {
          navigateTo(page);
          // Update URL hash tanpa reload
          history.pushState(null, '', '#' + page);
        }
      });
    });

    // Saat hash berubah (misal via back/forward)
    window.addEventListener('hashchange', function () {
      const hash = window.location.hash.substring(1);
      if (hash) navigateTo(hash);
    });
  }

  // ---------- Contact Form (jika ada) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      if (!name || !email || !message) {
        showToast('Harap isi semua field yang wajib.', 'error');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        showToast('Masukkan alamat email yang valid.', 'error');
        return;
      }
      showToast('Pesan Anda berhasil dikirim! Kami akan segera merespon.', 'success');
      contactForm.reset();
    });
  }

  // ---------- Admission Form (jika ada) ----------
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const birth = document.getElementById('regBirth').value;
      const program = document.getElementById('regProgram').value;
      if (!name || !email || !phone || !birth || !program) {
        showToast('Harap isi semua field yang wajib.', 'error');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        showToast('Masukkan alamat email yang valid.', 'error');
        return;
      }
      showToast(' Pendaftaran berhasil! Silakan cek email Anda untuk langkah selanjutnya.', 'success');
      admissionForm.reset();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu) {
      navMenu.classList.remove('open');
    }
  });
})();
